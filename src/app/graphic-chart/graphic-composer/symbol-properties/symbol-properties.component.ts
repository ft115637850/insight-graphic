import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { SymbolInfo } from '../../interfaces/symbol-info.data';

@Component({
  selector: 'app-symbol-properties',
  templateUrl: './symbol-properties.component.html',
  styleUrls: ['./symbol-properties.component.scss']
})
export class SymbolPropertiesComponent implements OnInit {
  private symbolViewBoxs = {
    clock270: {
      viewBox: '0 0 190 165',
      viewBoxWidth: 190,
      viewBoxHeight: 165
    },
    clock90: {
      viewBox: '0 0 120 120',
      viewBoxWidth: 120,
      viewBoxHeight: 120
    },
    clock360: {
      viewBox: '0 0 190 190',
      viewBoxWidth: 190,
      viewBoxHeight: 190
    },
    'horizontal-bar': {
      viewBox: '0 0 151 85',
      viewBoxWidth: 151,
      viewBoxHeight: 85
    },
    trend: {
      viewBox: '0 0 150 100',
      viewBoxWidth: 150,
      viewBoxHeight: 100
    }
  };
  currentGraphic: SymbolInfo;
  @Output() graphicChanged = new EventEmitter<any>();
  private symbols: SymbolInfo[];
  @Input()
  set focusedSymbols(focusedSymbols: SymbolInfo[]) {
    this.symbols = focusedSymbols;
    this.currentGraphic = this.focusedSymbols[0];
    // TO DO: Check data type
  }
  get focusedSymbols(): SymbolInfo[] {
    return this.symbols;
  }
  constructor() { }

  ngOnInit() {}

  onClickSample(e) {
    if (e !== this.currentGraphic.symbolType) {
      const newSymbol: SymbolInfo = {
        ...this.currentGraphic,
        symbolId: uuid.v4(),
        symbolType: e,
        ...this.symbolViewBoxs[e]
      };

      if (this.currentGraphic.symbolType === 'text') {
        newSymbol.strokeRGB = '15, 118, 199';
      }
      this.graphicChanged.emit({oldSymbol: this.currentGraphic, newSymbol});
    }
  }
}
