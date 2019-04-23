import { Input, Output, EventEmitter } from '@angular/core';
import { SymbolPosition } from '../../interfaces/symbol-position.data';
import { SymbolSize } from '../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../interfaces/symbol-info.data';

export class SymbolBase {
  // design value
  // private readonly tagNameHeight = 16;
  // private readonly startAngle = 0.75;    // Unit PI
  // private readonly sweepAngle = 1.5;
  // private readonly centerX = 83;
  // private readonly centerY = 83 + this.tagNameHeight + 4;
  // private readonly r = 75;
  // private subscriptionId: string;
  // readonly viewBoxWidth = 190;
  // readonly viewBoxHeight = 165;
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  @Output() symbolFocusChanged = new EventEmitter<SymbolInfo>();
  unit: string;
  max: number;
  min: number;
  // currentX: number;
  // currentY: number;
  // valueLargeArcFlag: number;
  // valuePath = '';
  pathStroke: string;
  valueStroke: string;

  onSymbolMoved(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolResized.emit(e);
  }

  onFocus() {
    if (this.isEditMode && !this.symbolInfo.isFocus) {
      this.symbolInfo.isFocus = true;
      this.symbolFocusChanged.emit(this.symbolInfo);
    }
  }

  loseFocus() {
    if (this.symbolInfo.isFocus) {
      this.symbolInfo.isFocus = false;
      this.symbolFocusChanged.emit(this.symbolInfo);
    }
  }
}
