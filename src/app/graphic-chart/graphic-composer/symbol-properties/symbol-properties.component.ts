import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { SymbolInfo } from '../../../interfaces/symbol-info.data';

@Component({
  selector: 'app-symbol-properties',
  templateUrl: './symbol-properties.component.html',
  styleUrls: ['./symbol-properties.component.scss']
})
export class SymbolPropertiesComponent implements OnInit {
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
        symbolType: e
      };

      if (this.currentGraphic.symbolType === 'text') {
        newSymbol.strokeRGB = '15, 118, 199';
      }
      this.graphicChanged.emit({oldSymbol: this.currentGraphic, newSymbol});
    }
  }
}
