import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SymbolInfo } from '../../interfaces/symbol-info.data';
import { TagInfo } from '../../interfaces/tag-info.data';
import { CardInfo } from '../../interfaces/card-info.data';
import { v4 as uuid } from 'uuid';
import { TagService, ResolutionService, BackgroundService } from '../../../../../api-client/api/api';

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
  isEditMode = true;
  tagList: TagInfo[] = [];
  symbolList: SymbolInfo[] = [];
  cardList: CardInfo[] = [];
  focusedSymbols: SymbolInfo[] = [];
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
              private tagSvc: TagService, private resolutionSvc: ResolutionService, private bgSvc: BackgroundService) {
    this.canvasProps = this.fb.group({
      width: [6],
      height: [6],
      bgSizeOption: ['horizontal']
    });
    const token = sessionStorage.getItem('token');
    this.tagSvc.configuration.accessToken = token;
    this.resolutionSvc.configuration.accessToken = token;
    this.bgSvc.configuration.accessToken = token;
    this.graphicId = '969e1cf9-9cef-4008-8074-f637f47f7ad3';
    this.bgSvc.getInfo(this.graphicId).subscribe(info => {
      this.canvasProps.get('width').setValue(info.width);
      this.canvasProps.get('height').setValue(info.height);
      this.canvasProps.get('bgSizeOption').setValue(info.bgSizeOption);
      this.updateCanvasSize();
      this.bgSvc.getImg(this.graphicId).subscribe(e => {
        const img = this.arrayBufferToBase64(e);
        this.backGroundImage = `data:${info.imgContentType};base64,${img}`;
      }, err => console.log(err));
    });

    this.tagSvc.getTags().subscribe(tags => this.tagList = tags.map(x => {
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
    }));
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


    // this.symbolList = [
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'clock270',
    //       tagId: '',
    //       tagName: 'NewtonInsight.SysTimeSec',
    //       viewBox: '0 0 190 165',
    //       viewBoxWidth: 190,
    //       viewBoxHeight: 165,
    //       positionXRatio: 0.08,
    //       positionYRatio: 0.1,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.11,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     // {
    //     //   symbolId: uuid.v4(),
    //     //   symbolType: 'clock360',
    //     //   tagId: '',
    //     //   tagName: 'NewtonInsight.SysTimeSec',
    //     //   positionXRatio: 0.08,
    //     //   positionYRatio: 0.3,
    //     //   positionX: 0,
    //     //   positionY: 0,
    //     //   svgWidth: 0,
    //     //   widthRatio: 0.11,
    //     //   strokeRGB: '255, 235, 59',
    //     //   isFocus: false,
    //     //   tagInfo: this.tagList[0]
    //     // },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'clock90',
    //       tagId: '',
    //       tagName: 'SysTimeSec',
    //       viewBox: '0 0 120 120',
    //       viewBoxWidth: 120,
    //       viewBoxHeight: 120,
    //       positionXRatio: 0.4,
    //       positionYRatio: 0.85,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.06,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'trend',
    //       tagId: '',
    //       tagName: 'SinTrend',
    //       viewBox: '0 0 150 100',
    //       viewBoxWidth: 150,
    //       viewBoxHeight: 100,
    //       positionXRatio: 0.85,
    //       positionYRatio: 0.1,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.12,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[2]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'trend',
    //       tagId: '',
    //       tagName: 'Pump',
    //       viewBox: '0 0 150 100',
    //       viewBoxWidth: 150,
    //       viewBoxHeight: 100,
    //       positionXRatio: 0.85,
    //       positionYRatio: 0.3,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.12,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'trend',
    //       tagId: '',
    //       tagName: 'Pressure',
    //       viewBox: '0 0 150 100',
    //       viewBoxWidth: 150,
    //       viewBoxHeight: 100,
    //       positionXRatio: 0.85,
    //       positionYRatio: 0.5,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.12,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'horizontal-bar',
    //       tagId: '',
    //       tagName: 'Pressure',
    //       viewBox: '0 0 151 85',
    //       viewBoxWidth: 151,
    //       viewBoxHeight: 85,
    //       positionXRatio: 0.4,
    //       positionYRatio: 0.1,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.12,
    //       strokeRGB: '255, 235, 59',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'radio-circle',
    //       tagId: '',
    //       tagName: 'isPumping',
    //       viewBox: '0 0 60 60',
    //       viewBoxWidth: 60,
    //       viewBoxHeight: 60,
    //       positionXRatio: 0.65,
    //       positionYRatio: 0.65,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.05,
    //       strokeRGB: '76, 175, 80',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     },
    //     {
    //       symbolId: uuid.v4(),
    //       symbolType: 'radio-rect',
    //       tagId: '',
    //       tagName: 'noPumping',
    //       viewBox: '0 0 60 60',
    //       viewBoxWidth: 60,
    //       viewBoxHeight: 60,
    //       positionXRatio: 0.3,
    //       positionYRatio: 0.1,
    //       positionX: 0,
    //       positionY: 0,
    //       svgWidth: 0,
    //       widthRatio: 0.04,
    //       strokeRGB: '76, 175, 80',
    //       isFocus: false,
    //       tagInfo: this.tagList[0]
    //     }
    //   ];
  }

  ngOnInit() {
    this.resolutionSvc.getResolutions().subscribe(res => {
      this.resolutions = res.map(resolution => {
        return {
          x: resolution.x,
          y: resolution.y,
          viewValue: resolution.viewValue
        } as Resolution;
      });
      this.updateCanvasSize();
    });
  }

  onResize(e) {
    this.updateCanvasSize();
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
    this.updateSymbolList();
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
      const img = new Image();
      img.src = fr.result as string;
      img.onload = () => {  // Check whether it is an image
        this.backGroundImage = fr.result;
        this.bgImageWidth = img.width;
        this.bgImageHeight = img.height;
        this.backgroundSize = `${this.canvasWidth}px ${this.canvasWidth * this.bgImageHeight
          / this.bgImageWidth}px`;
        this.backGroundImageFile = e.target.files[0];
      };
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

  onSave() {
    this.bgSvc.saveBackground(this.graphicId,
      this.canvasProps.value.width,
      this.canvasProps.value.height,
      this.canvasProps.value.bgSizeOption,
      this.backGroundImageFile
    ).subscribe(() => this.isEditMode = false);
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
      this.symbolList = [...this.symbolList, {
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
        isFocus: false,
        tagInfo: newElement
      }];
    } else {
      this.cardList = [
        ...this.cardList, {
          cardId: uuid.v4(),
          positionXRatio: posX / this.canvasWidth,
          positionYRatio: posY / this.canvasHeight,
          positionX: posX,
          positionY: posY,
          widthRatio: 0.11,
          heightRatio: 0.11,
          cardWidth: 0.11 * this.canvasWidth,
          cardHeight: 0.11 * this.canvasHeight,
          strokeRGB: newElement.colorValue,
          alpha: 1
        }
      ];
    }
  }

  onSymbolFocusChanged(e: SymbolInfo) {
    if (e.isFocus) {
      this.focusedSymbols.push(e);
    } else {
      this.focusedSymbols = this.focusedSymbols.filter(x => x.symbolId !== e.symbolId);
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

  private updateSymbolList() {
    this.symbolList.forEach(symbol => {
      symbol.positionX = symbol.positionXRatio * this.canvasWidth;
      symbol.positionY = symbol.positionYRatio * this.canvasHeight;
      symbol.svgWidth = symbol.widthRatio * this.canvasWidth;
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
}
