import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

/*
interface Resolution {
  value: number;
  viewValue: string;
}
*/
@Component({
  selector: 'app-composer-view',
  templateUrl: './composer-view.component.html',
  styleUrls: ['./composer-view.component.scss']
})
export class ComposerViewComponent implements OnInit {
  canvasProps: FormGroup;
  canvasMaxSize = 20;
  canvasMinSize = 3;
  canvasWidth: number;
  canvasHeight: number;
  backGroundImage: string | ArrayBuffer | null = null;
  backgroundSize = '100% 100%';
  @ViewChild('contentHolder')
  contentHolder: ElementRef;
  private bgImageWidth: number;
  private bgImageHeight: number;
  /*
    resolutions: Resolution[] = [
      { value: 4 / 3, viewValue: '640x480' },
      { value: 4 / 3, viewValue: '800x600' },
      { value: 4 / 3, viewValue: '320x240' },
      { value: 4 / 3, viewValue: '160x120' },
      { value: 3 / 2, viewValue: '240x160' },
      { value: 15 / 9, viewValue: '400x240' },
      { value: 3 / 2, viewValue: '480x320' },
      { value: 16 / 10, viewValue: '768x480' },
      { value: 16 / 9, viewValue: '854x480' },
      { value: 3 / 2, viewValue: '960x640' },
      { value: 16 / 9, viewValue: '1024x576/600' },
      { value: 4 / 3, viewValue: '1024x768' },
      { value: 16 / 9, viewValue: '1366x768' },
      { value: 4 / 3, viewValue: '1152x864' },
      { value: 8 / 5, viewValue: '1440x900' },
      { value: 5 / 4, viewValue: '1280x1024' },
      { value: 4 / 3, viewValue: '1400x1050' },
      { value: 16 / 10, viewValue: '1680x1050' },
      { value: 4 / 3, viewValue: '1600x1200' },
      { value: 16 / 10, viewValue: '1920x1200' },
      { value: 16 / 9, viewValue: '2048x1152' },
      { value: 4 / 3, viewValue: '2048x1536' },
      { value: 16 / 10, viewValue: '2560x1600' },
      { value: 5 / 4, viewValue: '2560x2048' },
      { value: 25 / 16, viewValue: '3200x2048' },
      { value: 4 / 3, viewValue: '3200x2400' },
      { value: 16 / 10, viewValue: '3840x2400' },
      { value: 4 / 3, viewValue: '4096x3072' },
      { value: 16 / 10, viewValue: '5120x3200' },
      { value: 5 / 4, viewValue: '5120x4096' },
      { value: 25 / 16, viewValue: '6400x4096' },
      { value: 4 / 3, viewValue: '6400x4800' },
      { value: 8 / 5, viewValue: '7680x4800' },
      { value: 16 / 9, viewValue: '1280x720' },
      { value: 16 / 9, viewValue: '1920x1080' },
      { value: 16 / 9, viewValue: '640x360' },
      { value: 16 / 9, viewValue: '960x540' },
      { value: 16 / 9, viewValue: '2560x1440' },
      { value: 16 / 9, viewValue: '2560x1440' },
      { value: 21 / 9, viewValue: '3440x1440' },
      { value: 16 / 9, viewValue: '3200x1800' },
      { value: 16 / 9, viewValue: '3200x1800' },
      { value: 16 / 9, viewValue: '3840x2160' },
      { value: 16 / 9, viewValue: '5120x2880' },
      { value: 16 / 9, viewValue: '7680x4320' },
    ];
  */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private fb: FormBuilder) {
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/add.svg'))
      .addSvgIcon(
        'minus',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/minus.svg'));
    this.canvasProps = this.fb.group({
      width: [6],
      height: [6],
      bgSizeOption: ['stretch']
    });
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

    this.resizeBackground();
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
    this.canvasProps.get('bgSizeOption').setValue('stretch');
    const fr = new FileReader();
    fr.readAsDataURL(e.target.files[0]);
    fr.onload = () => {
      const img = new Image();
      img.src = fr.result as string;
      img.onload = () => {  // Check whether it is an image
        this.backGroundImage = fr.result;
        this.bgImageWidth = img.width;
        this.bgImageHeight = img.height;
      };
    };
  }

  removeBackground() {
    this.backGroundImage = null;
    this.canvasProps.get('bgSizeOption').setValue('stretch');
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
}
