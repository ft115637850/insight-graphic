import { Input } from '@angular/core';
import {SymbolInfo} from '../interfaces/symbol-info.data';

export class SymbolBase {
  @Input() symbolInfo: SymbolInfo;
  unit: string;
  max: number;
  min: number;
  pathStroke: string;
  valueStroke: string;
}
