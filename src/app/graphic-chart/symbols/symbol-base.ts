import { Input, Output, EventEmitter } from '@angular/core';
import { SymbolPosition } from '../../interfaces/symbol-position.data';
import { SymbolSize } from '../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../interfaces/symbol-info.data';

export class SymbolBase {
  @Input() symbolInfo: SymbolInfo;
  unit: string;
  max: number;
  min: number;
  pathStroke: string;
  valueStroke: string;
}
