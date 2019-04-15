import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss']
})
export class LabelTextComponent implements OnInit {

  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Input() symbolId = '';
  currentValue: string;
  constructor() { }

  ngOnInit() {
    this.currentValue = 'test text long long';
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolId;
    this.symbolMoved.emit(e);
  }
}
