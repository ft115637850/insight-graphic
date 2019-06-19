import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { SymbolInfo } from '../../interfaces/symbol-info.data';

@Component({
  selector: 'app-symbol-properties',
  templateUrl: './symbol-properties.component.html',
  styleUrls: ['./symbol-properties.component.scss']
})
export class SymbolPropertiesComponent implements OnInit {
  colorPalettes = [{
    color: 'rgb(0, 0, 0)',
    colorValue: '0, 0, 0'
  }, {
    color: 'rgb(255, 255, 255)',
    colorValue: '255, 255, 255'
  }, {
    color: 'rgb(244, 67, 54)',
    colorValue: '244, 67, 54'
  }, {
    color: 'rgb(233, 30, 99)',
    colorValue: '233, 30, 99'
  }, {
    color: 'rgb(156, 39, 176)',
    colorValue: '156, 39, 176'
  }, {
    color: 'rgb(103, 58, 183)',
    colorValue: '103, 58, 183'
  }, {
    color: 'rgb(63, 81, 181)',
    colorValue: '63, 81, 181'
  }, {
    color: 'rgb(33, 150, 243)',
    colorValue: '33, 150, 243'
  }, {
    color: 'rgb(3, 169, 244)',
    colorValue: '3, 169, 244'
  }, {
    color: 'rgb(0, 188, 212)',
    colorValue: '0, 188, 212'
  }, {
    color: 'rgb(0, 150, 136)',
    colorValue: '0, 150, 136'
  }, {
    color: 'rgb(76, 175, 80)',
    colorValue: '76, 175, 80'
  }, {
    color: 'rgb(139, 195, 74)',
    colorValue: '139, 195, 74'
  }, {
    color: 'rgb(205, 220, 57)',
    colorValue: '205, 220, 57'
  }, {
    color: 'rgb(255, 235, 59)',
    colorValue: '255, 235, 59'
  }, {
    color: 'rgb(255, 193, 7)',
    colorValue: '255, 193, 7'
  }, {
    color: 'rgb(255, 152, 0)',
    colorValue: '255, 152, 0'
  }, {
    color: 'rgb(255, 87, 34)',
    colorValue: '255, 87, 34'
  }, {
    color: 'rgb(121, 85, 72)',
    colorValue: '121, 85, 72'
  }, {
    color: 'rgb(158, 158, 158)',
    colorValue: '158, 158, 158'
  }, {
    color: 'rgb(96, 125, 139)',
    colorValue: '96, 125, 139'
  }];
  graphicColor = '33, 33, 33';
  private symbolViewBoxs = {
    text: {
      viewBox: '0 0 53 21',
      viewBoxWidth: 53,
      viewBoxHeight: 21
    },
    clock180: {
      viewBox: '0 0 190 120',
      viewBoxWidth: 190,
      viewBoxHeight: 120
    },
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
    'vertical-bar': {
      viewBox: '0 0 151 151',
      viewBoxWidth: 151,
      viewBoxHeight: 151
    },
    trend: {
      viewBox: '0 0 150 100',
      viewBoxWidth: 150,
      viewBoxHeight: 100
    },
    'radio-circle': {
      viewBox: '0 0 60 60',
      viewBoxWidth: 60,
      viewBoxHeight: 60
    },
    'radio-rect': {
      viewBox: '0 0 60 60',
      viewBoxWidth: 60,
      viewBoxHeight: 60
    },
    toggle: {
      viewBox: '0 0 100 65',
      viewBoxWidth: 100,
      viewBoxHeight: 65
    },
    'toggle-line': {
      viewBox: '0 0 100 60',
      viewBoxWidth: 100,
      viewBoxHeight: 60
    },
    'toggle-rect': {
      viewBox: '0 0 120 60',
      viewBoxWidth: 120,
      viewBoxHeight: 60
    }
  };
  currentGraphic: SymbolInfo;
  @Output() graphicChanged = new EventEmitter<any>();
  private symbols: SymbolInfo[];
  @Input()
  set focusedSymbols(focusedSymbols: SymbolInfo[]) {
    this.symbols = focusedSymbols;
    this.currentGraphic = this.focusedSymbols[0];
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

      if (e === 'text') {
        newSymbol.strokeRGB = '33, 33, 33';
      } else {
        newSymbol.strokeRGB = '15, 118, 199';
      }
      this.graphicChanged.emit({oldSymbol: this.currentGraphic, newSymbol});
    }
  }
}
