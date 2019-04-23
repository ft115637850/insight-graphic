import { Input, Output, EventEmitter } from '@angular/core';
import { SymbolPosition } from '../../interfaces/symbol-position.data';
import { SymbolSize } from '../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../interfaces/symbol-info.data';

export class SymbolBase {
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  @Output() symbolFocusChanged = new EventEmitter<SymbolInfo>();
  unit: string;
  max: number;
  min: number;
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
