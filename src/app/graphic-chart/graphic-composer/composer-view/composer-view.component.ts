import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SymbolInfo } from '../../interfaces/symbol-info.data';
import { TagInfo } from '../../interfaces/tag-info.data';
import { CardInfo } from '../../interfaces/card-info.data';
import { v4 as uuid } from 'uuid';


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
  private addingTagPosition = null;
  canvasProps: FormGroup;
  canvasMaxSize = 20;
  canvasMinSize = 3;
  canvasWidth: number;
  canvasHeight: number;
  backGroundImage: string | ArrayBuffer | null = null;
  backgroundSize = '100% 100%';
  isEditMode = true;
  tagList: TagInfo[];
  symbolList: SymbolInfo[] = [];
  cardList: CardInfo[] = [];
  focusedSymbols: SymbolInfo[] = [];
  resolutionsLst: Resolution[] = [];
  @ViewChild('contentHolder')
  contentHolder: ElementRef;
  @ViewChild('mainCanvas')
  mainCanvas: ElementRef;
  private bgImageWidth: number;
  private bgImageHeight: number;
  private resolutions: Resolution[] = [
    { x: 4, y: 3, viewValue: '640x480' },
    { x: 4, y: 3, viewValue: '800x600' },
    { x: 4, y: 3, viewValue: '320x240' },
    { x: 4, y: 3, viewValue: '160x120' },
    { x: 3, y: 2, viewValue: '240x160' },
    { x: 15, y: 9, viewValue: '400x240' },
    { x: 3, y: 2, viewValue: '480x320' },
    { x: 16, y: 10, viewValue: '768x480' },
    { x: 16, y: 9, viewValue: '854x480' },
    { x: 3, y: 2, viewValue: '960x640' },
    { x: 16, y: 9, viewValue: '1024x576/600' },
    { x: 4, y: 3, viewValue: '1024x768' },
    { x: 16, y: 9, viewValue: '1366x768' },
    { x: 4, y: 3, viewValue: '1152x864' },
    { x: 8, y: 5, viewValue: '1440x900' },
    { x: 5, y: 4, viewValue: '1280x1024' },
    { x: 4, y: 3, viewValue: '1400x1050' },
    { x: 16, y: 10, viewValue: '1680x1050' },
    { x: 4, y: 3, viewValue: '1600x1200' },
    { x: 16, y: 10, viewValue: '1920x1200' },
    { x: 16, y: 9, viewValue: '2048x1152' },
    { x: 4, y: 3, viewValue: '2048x1536' },
    { x: 16, y: 10, viewValue: '2560x1600' },
    { x: 5, y: 4, viewValue: '2560x2048' },
    { x: 25, y: 16, viewValue: '3200x2048' },
    { x: 4, y: 3, viewValue: '3200x2400' },
    { x: 16, y: 10, viewValue: '3840x2400' },
    { x: 4, y: 3, viewValue: '4096x3072' },
    { x: 16, y: 10, viewValue: '5120x3200' },
    { x: 5, y: 4, viewValue: '5120x4096' },
    { x: 25, y: 16, viewValue: '6400x4096' },
    { x: 4, y: 3, viewValue: '6400x4800' },
    { x: 8, y: 5, viewValue: '7680x4800' },
    { x: 16, y: 9, viewValue: '1280x720' },
    { x: 16, y: 9, viewValue: '1920x1080' },
    { x: 16, y: 9, viewValue: '640x360' },
    { x: 16, y: 9, viewValue: '960x540' },
    { x: 16, y: 9, viewValue: '2560x1440' },
    { x: 16, y: 9, viewValue: '2560x1440' },
    { x: 21, y: 9, viewValue: '3440x1440' },
    { x: 16, y: 9, viewValue: '3200x1800' },
    { x: 16, y: 9, viewValue: '3200x1800' },
    { x: 16, y: 9, viewValue: '3840x2160' },
    { x: 16, y: 9, viewValue: '5120x2880' },
    { x: 16, y: 9, viewValue: '7680x4320' },
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private fb: FormBuilder) {
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
    this.canvasProps = this.fb.group({
      width: [6],
      height: [6],
      bgSizeOption: ['horizontal']
    });

    this.tagList = [
      {
        tagId: '123456',
        tagName: 'SysTimeSec',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '789012',
        tagName: 'Pressure',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '189012',
        tagName: 'SinTrend',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '189013',
        tagName: 'changingString',
        alias: '',
        units: '',
        max: 0,
        min: 0,
        dataType: 'String',
        source: 'Wuhan Water Plant',
        description: 'label string',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '128897',
        tagName: 'isPumping',
        alias: '',
        units: 'ON/OFF',
        max: 0,
        min: 0,
        dataType: 'Discrete',
        source: 'Wuhan Water Plant',
        description: 'label string',
        location: '\\Quebec\\Pointe-Claire'
      }
    ];

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
    this.updateCanvasSize();
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
      res => res.x/res.y === this.canvasProps.value.width/this.canvasProps.value.height);
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
      };
    };
  }

  removeBackground() {
    this.backGroundImage = null;
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
    this.isEditMode = false;
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
    const sym = this.symbolList.find(s => s.symbolId === e.symbolId);
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

  onAddTag(e: CdkDragDrop<TagInfo[]>) {
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

    const newTag = e.previousContainer.data[e.previousIndex];
    // better performance than this.symbolList.push()
    this.symbolList = [...this.symbolList, {
      symbolId: uuid.v4(),
      symbolType: 'text',
      tagId: newTag.tagId,
      tagName: newTag.tagName,
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
      tagInfo: newTag
    }];
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
}
