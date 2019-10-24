import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { concat, forkJoin, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SymbolInfo } from '../../interfaces/symbol-info.data';
import { TagInfo } from '../../interfaces/tag-info.data';
import { CardInfo } from '../../interfaces/card-info.data';
import { CardSize } from '../../interfaces/card-size.data';
import { v4 as uuid } from 'uuid';
import { TagService, ResolutionService, BackgroundService, GraphicChartService } from '../../../../../api-client/api/api';
import { GraphicChartData, SymbolModel, CardModel } from '../../../../../api-client/model/models';

interface Resolution {
  x: number;
  y: number;
  viewValue: string;
}

@Component({
  selector: 'app-composer-view',
  templateUrl: './composer-view.component.html',
  styleUrls: ['./composer-view.component.scss']
})
export class ComposerViewComponent implements OnInit {
  canvasProps: FormGroup;
  canvasMaxSize = 25;
  canvasMinSize = 2;
  canvasWidth: number;
  canvasHeight: number;
  backGroundImage: string | ArrayBuffer | null = null;
  backgroundSize = '100% 100%';
  isEditMode = false;
  hideHeader = false;
  chartName = '';
  tagList: TagInfo[] = [];
  symbolList: SymbolInfo[] = [];
  cardList: CardInfo[] = [];
  focusedSymbols: SymbolInfo[] = [];
  focusedCard: CardInfo;
  resolutionsLst: Resolution[] = [];
  @ViewChild('contentHolder')
  contentHolder: ElementRef;
  @ViewChild('mainCanvas')
  mainCanvas: ElementRef;
  @ViewChild('imgFileInput')
  imgFileInput: ElementRef;
  private graphicId: string;
  private addingTagPosition = null;
  private backGroundImageFile: File | null = null;
  private bgImageWidth: number;
  private bgImageHeight: number;
  private resolutions: Resolution[] = [];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private fb: FormBuilder,
              private tagSvc: TagService, private resolutionSvc: ResolutionService,
              private bgSvc: BackgroundService, private graphicChart: GraphicChartService,
              private routerIonfo: ActivatedRoute, private router: Router) {
    this.canvasProps = this.fb.group({
      width: [6],
      height: [6],
      bgSizeOption: ['horizontal']
    });

    this.graphicId = this.routerIonfo.snapshot.paramMap.get('id');
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/add.svg'))
      .addSvgIcon(
        'minus',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/minus.svg'))
      .addSvgIcon(
        'save',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/save.svg'))
      .addSvgIcon(
        'cancel',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/cancel.svg'))
      .addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/edit.svg'))
      .addSvgIcon(
        'fullscreen',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/fullscreen.svg'));
  }

  ngOnInit() {
    if (this.graphicId) {
      this.loadGraphicChartData();
    } else {
      this.newGraphicChart();
    }
  }

  onResize(e) {
    if (!this.isEditMode && screen.width === window.innerWidth && screen.height <= window.innerHeight + 1) {
      this.hideHeader = true;
    } else {
      this.hideHeader = false;
    }

    setTimeout(() => this.updateCanvasSize(), 200);
  }

  updateCanvasSize() {
    if (this.canvasProps.value.width / this.canvasProps.value.height >
      this.contentHolder.nativeElement.offsetWidth / this.contentHolder.nativeElement.offsetHeight) {
      this.canvasWidth = this.contentHolder.nativeElement.offsetWidth;
      this.canvasHeight = this.canvasWidth * this.canvasProps.value.height / this.canvasProps.value.width;
    } else {
      this.canvasHeight = this.contentHolder.nativeElement.offsetHeight;
      this.canvasWidth = this.canvasHeight * this.canvasProps.value.width / this.canvasProps.value.height;
    }

    this.resolutionsLst = this.resolutions.filter(
      res => res.x / res.y === this.canvasProps.value.width / this.canvasProps.value.height);
    this.resizeBackground();
    this.adjustSymbolsCardsSize();
  }

  changeSize(action: string, widthOrHeight: string) {
    if (action === 'add') {
      if (widthOrHeight === 'width' && this.canvasProps.value.width < this.canvasMaxSize) {
        this.canvasProps.get('width').setValue(this.canvasProps.value.width + 1);
        this.updateCanvasSize();
      } else if (widthOrHeight === 'height' && this.canvasProps.value.height < this.canvasMaxSize) {
        this.canvasProps.get('height').setValue(this.canvasProps.value.height + 1);
        this.updateCanvasSize();
      }
    } else {
      if (widthOrHeight === 'width' && this.canvasProps.value.width > this.canvasMinSize) {
        this.canvasProps.get('width').setValue(this.canvasProps.value.width - 1);
        this.updateCanvasSize();
      } else if (widthOrHeight === 'height' && this.canvasProps.value.height > this.canvasMinSize) {
        this.canvasProps.get('height').setValue(this.canvasProps.value.height - 1);
        this.updateCanvasSize();
      }
    }
  }

  previewImage(e) {
    this.canvasProps.get('bgSizeOption').setValue('horizontal');
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);
    fr.onload = () => {
      this.backGroundImage = fr.result;
      this.updateBackGroundImageSize(fr.result);
      this.backGroundImageFile = e.target.files[0];
    };
  }

  removeBackground() {
    this.backGroundImage = null;
    this.backGroundImageFile = null;
    this.imgFileInput.nativeElement.value = '';
    this.canvasProps.get('bgSizeOption').setValue('horizontal');
  }

  resizeBackground() {
    if (this.backGroundImage === null) {
      return;
    }

    switch (this.canvasProps.value.bgSizeOption) {
      case 'stretch':
        this.backgroundSize = '100% 100%';
        break;
      case 'horizontal':
        this.backgroundSize = `${this.canvasWidth}px ${this.canvasWidth * this.bgImageHeight
          / this.bgImageWidth}px`;
        break;
      case 'vertical':
        this.backgroundSize = `${this.canvasHeight * this.bgImageWidth
          / this.bgImageHeight}px ${this.canvasHeight}px`;
        break;
    }
  }

  onCancel() {
    this.isEditMode = false;
    if (this.graphicId) {
      this.loadGraphicChartData();
    } else {
      this.router.navigateByUrl('graphic-chart-list');
    }
  }

  onSave() {
    if (!this.chartName) {
      return;
    }

    const modelLst: SymbolModel[] = this.symbolList.map(x => {
      return {
        symbolId: x.symbolId,
        symbolType: x.symbolType,
        tagId: x.tagId,
        tagName: x.tagName,
        viewBox: x.viewBox,
        viewBoxWidth: x.viewBoxWidth,
        viewBoxHeight: x.viewBoxHeight,
        positionXRatio: x.positionXRatio,
        positionYRatio: x.positionYRatio,
        widthRatio: x.widthRatio,
        strokeRGB: x.strokeRGB
      } as SymbolModel;
    });
    const cardLst: CardModel[] =  this.cardList.map(x => {
      return {
        cardId: x.cardId,
        positionXRatio: x.positionXRatio,
        positionYRatio: x.positionYRatio,
        widthRatio: x.widthRatio,
        heightRatio: x.heightRatio,
        strokeRGB: x.strokeRGB,
        alpha: x.alpha,
        zOrder: x.zOrder
      } as CardModel;
    });
    const chartData: GraphicChartData = {
      graphicChartId: this.graphicId,
      name: this.chartName,
      createdBy: sessionStorage.getItem('usrName'),
      symbolList: modelLst,
      cardList: cardLst
    };
    this.graphicChart.saveGraphicChartData(chartData).subscribe(chartid =>
      this.bgSvc.saveBackground(chartid,
        this.canvasProps.value.width,
        this.canvasProps.value.height,
        this.canvasProps.value.bgSizeOption,
        this.backGroundImageFile).subscribe(() => {
          this.isEditMode = false;
          history.replaceState({id: chartid}, null, `graphic-chart;id=${chartid}`);
        })
    );
  }

  onCloseEdit() {
    this.updateCanvasSize();
  }

  onOpened() {
    this.updateCanvasSize();
  }

  onEdit() {
    this.isEditMode = true;
  }

  onSymbolMoved(e) {
    let sym: any = this.symbolList.find(s => s.symbolId === e.symbolId);
    if (!sym) {
      sym = this.cardList.find(s => s.cardId === e.symbolId);
    }

    sym.positionX = e.positionX;
    sym.positionXRatio = sym.positionX / this.canvasWidth;
    sym.positionY = e.positionY;
    sym.positionYRatio = sym.positionY / this.canvasHeight;
  }

  onSymbolResized(e) {
    const sym = this.symbolList.find(s => s.symbolId === e.symbolId);
    sym.svgWidth = e.svgWidth;
    sym.widthRatio = sym.svgWidth / this.canvasWidth;
  }

  onCardResized(e: CardSize) {
    const card = this.cardList.find(c => c.cardId === e.cardId);
    card.cardWidth = e.width;
    card.cardHeight = e.height;
    card.widthRatio = card.cardWidth / this.canvasWidth;
    card.heightRatio = card.cardHeight / this.canvasHeight;
  }

  onAddingTagMoved(e) {
    this.addingTagPosition = e;
  }

  onAddTag(e: CdkDragDrop<any>) {
    if (e.previousContainer === e.container || !e.isPointerOverContainer) {
      this.addingTagPosition = null;
      return;
    }

    const canvasRect = this.mainCanvas.nativeElement.getBoundingClientRect();
    let posX = this.addingTagPosition.x - canvasRect.left - 50; // 50px 20px is the label-text margin
    let posY = this.addingTagPosition.y - canvasRect.top - 20;
    if (posX < 0) {
      posX = 0;
    } else if (posX + 106 > canvasRect.width) {
      posX = canvasRect.width - 106;
    }

    if (posY < 0) {
      posY = 0;
    } else if (posY + 48 > canvasRect.height) {
      posY = canvasRect.height - 48;
    }

    const newElement = e.previousContainer.data[e.previousIndex];
    if (newElement.tagId) {
      // better performance than this.symbolList.push()
      const newSym = {
        symbolId: uuid.v4(),
        symbolType: 'text',
        tagId: newElement.tagId,
        tagName: newElement.tagName,
        viewBox: '0 0 53 21',
        viewBoxWidth: 53,
        viewBoxHeight: 21,
        positionXRatio: posX / this.canvasWidth,
        positionYRatio: posY / this.canvasHeight,
        positionX: posX,
        positionY: posY,
        svgWidth: 0.11 * this.canvasWidth,
        widthRatio: 0.11,
        strokeRGB: '33, 150, 243',
        isFocus: true,
        tagInfo: newElement
      };
      this.symbolList = [...this.symbolList, newSym];

      this.focusedSymbols.push(newSym);
      this.focusedCard = null;
    } else {
      const newCard = {
        cardId: uuid.v4(),
        positionXRatio: posX / this.canvasWidth,
        positionYRatio: posY / this.canvasHeight,
        positionX: posX,
        positionY: posY,
        widthRatio: 0.11,
        heightRatio: 0.11,
        cardWidth: 0.11 * this.canvasWidth,
        cardHeight: 0.11 * this.canvasWidth,
        strokeRGB: newElement.colorValue,
        alpha: '1',
        zOrder: 1,
        isFocus: true
      };
      this.cardList = [
        ...this.cardList, newCard
      ];
      this.focusedSymbols = [];
      this.focusedCard = newCard;
    }
  }

  onSymbolFocusChanged(e: SymbolInfo) {
    if (e.isFocus) {
      this.focusedSymbols.push(e);
      this.focusedCard = null;
    } else {
      this.focusedSymbols = this.focusedSymbols.filter(x => x.symbolId !== e.symbolId);
    }
  }

  onCardFocusChanged(e: CardInfo) {
    if (e.isFocus) {
      this.focusedCard = e;
      this.focusedSymbols = [];
    } else if (e.cardId === this.focusedCard.cardId) {
      this.focusedCard = null;
    }
  }

  onGraphicChanged(e) {
    const newList = this.symbolList.filter(x => x.symbolId !== e.oldSymbol.symbolId);
    this.symbolList = [
      ...newList,
      e.newSymbol
    ];
    const newfocusedSymbols = this.focusedSymbols.filter(x => x.symbolId !== e.oldSymbol.symbolId);
    this.focusedSymbols = [
      ...newfocusedSymbols,
      e.newSymbol
    ];
  }

  onGraphicRemoved(e: SymbolInfo) {
    this.focusedSymbols = this.focusedSymbols.filter(x => x.symbolId !== e.symbolId);
    this.symbolList = this.symbolList.filter(x => x.symbolId !== e.symbolId);
  }

  onCardChanged(e) {
    const newList = this.cardList.filter(x => x.cardId !== e.oldCard.cardId);
    this.cardList = [
      ...newList,
      e.newCard
    ];
    this.focusedCard = e.newCard;
  }

  onCardRemoved(e: CardInfo) {
    if (this.focusedCard.cardId === e.cardId) {
      this.focusedCard = null;
    }
    this.cardList = this.cardList.filter(x => x.cardId !== e.cardId);
  }

  private adjustSymbolsCardsSize() {
    this.symbolList.forEach(symbol => {
      symbol.positionX = symbol.positionXRatio * this.canvasWidth;
      symbol.positionY = symbol.positionYRatio * this.canvasHeight;
      symbol.svgWidth = symbol.widthRatio * this.canvasWidth;
    });
    this.cardList.forEach(card => {
      card.positionX = card.positionXRatio * this.canvasWidth;
      card.positionY = card.positionYRatio * this.canvasHeight;
      card.cardWidth = card.widthRatio * this.canvasWidth;
      card.cardHeight = card.heightRatio * this.canvasHeight;
    });
  }

  private arrayBufferToBase64(buffer: ArrayBuffer ) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  private updateBackGroundImageSize(bgImg: string | ArrayBuffer) {
    const img = new Image();
    img.src = bgImg as string;
    img.onload = () => {  // Check whether it is an image
      this.bgImageWidth = img.width;
      this.bgImageHeight = img.height;
      this.backgroundSize = `${this.canvasWidth}px ${this.canvasWidth * this.bgImageHeight
        / this.bgImageWidth}px`;
    };
  }

  private newGraphicChart() {
    this.isEditMode = true;
    this.graphicId = '';
    forkJoin([
      this.resolutionSvc.getResolutions().pipe(tap(
        res => this.resolutions = res.map(resolution => {
          return {
            x: resolution.x,
            y: resolution.y,
            viewValue: resolution.viewValue
          } as Resolution;
        })
      )),
      this.tagSvc.getTags().pipe(tap(tags => this.tagList = tags.map(x => {
        return {
          tagId: x.id,
          tagName: x.name,
          alias: x.alias,
          units: x.units,
          max: x.max,
          min: x.min,
          dataType: x.dataType,
          source: x.source,
          description: x.description,
          location: x.location
        } as TagInfo;
      })))
    ]).pipe(tap(() => this.updateCanvasSize())).subscribe();
  }

  private loadGraphicChartData() {
    let imgContentType = '';
    concat(
      forkJoin([
        this.bgSvc.getInfo(this.graphicId).pipe(tap(info => {
          this.canvasProps.get('width').setValue(info.width);
          this.canvasProps.get('height').setValue(info.height);
          this.canvasProps.get('bgSizeOption').setValue(info.bgSizeOption);
          imgContentType = info.imgContentType;
        })),
        this.resolutionSvc.getResolutions().pipe(tap(
          res => this.resolutions = res.map(resolution => {
            return {
              x: resolution.x,
              y: resolution.y,
              viewValue: resolution.viewValue
            } as Resolution;
          })
        )),
        this.tagSvc.getTags().pipe(tap(tags => this.tagList = tags.map(x => {
          return {
            tagId: x.id,
            tagName: x.name,
            alias: x.alias,
            units: x.units,
            max: x.max,
            min: x.min,
            dataType: x.dataType,
            source: x.source,
            description: x.description,
            location: x.location
          } as TagInfo;
        })))
      ]).pipe(tap(() => this.updateCanvasSize())),
      forkJoin([
        this.bgSvc.getImg(this.graphicId).pipe(
          tap(e => {
            this.backGroundImageFile = new File([e], 'img.jpg', {type: imgContentType});
            const img = this.arrayBufferToBase64(e);
            this.backGroundImage = `data:${imgContentType};base64,${img}`;
            this.updateBackGroundImageSize(this.backGroundImage);
          }),
          catchError(err => of(null))),
        this.graphicChart.getGraphicChartData(this.graphicId).pipe(tap(data => {
            this.chartName = data.name;
            this.symbolList = data.symbolList.map(sym => {
              return {
                symbolId: sym.symbolId,
                symbolType: sym.symbolType,
                tagId: sym.tagId,
                tagName: sym.tagName,
                viewBox: sym.viewBox,
                viewBoxWidth: sym.viewBoxWidth,
                viewBoxHeight: sym.viewBoxHeight,
                positionXRatio: sym.positionXRatio,
                positionYRatio: sym.positionYRatio,
                positionX: sym.positionXRatio * this.canvasWidth,
                positionY: sym.positionYRatio * this.canvasHeight,
                svgWidth: sym.widthRatio * this.canvasWidth,
                widthRatio: sym.widthRatio,
                strokeRGB: sym.strokeRGB,
                isFocus: false,
                tagInfo: this.tagList.find(t => t.tagId === sym.tagId)
              } as SymbolInfo;
            });
            this.cardList =  data.cardList.map(c => {
              return {
                cardId: c.cardId,
                positionXRatio: c.positionXRatio,
                positionYRatio: c.positionYRatio,
                positionX: c.positionXRatio * this.canvasWidth,
                positionY: c.positionYRatio * this.canvasHeight,
                widthRatio: c.widthRatio,
                heightRatio: c.heightRatio,
                cardWidth: c.widthRatio * this.canvasWidth,
                cardHeight: c.heightRatio * this.canvasHeight,
                strokeRGB: c.strokeRGB,
                alpha: c.alpha,
                zOrder: c.zOrder,
                isFocus: false
              } as CardInfo;
            });
          }
        ))
      ])
    ).subscribe();
  }
}
