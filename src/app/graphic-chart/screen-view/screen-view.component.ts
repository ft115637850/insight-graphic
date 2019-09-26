import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../services/tags-value.service';
import {SymbolInfo} from '../interfaces/symbol-info.data';
import {CardInfo} from '../interfaces/card-info.data';
import { SymbolPosition } from '../interfaces/symbol-position.data';
import { SymbolSize } from '../interfaces/symbol-size.data';
import { CardSize } from '../interfaces/card-size.data';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit, OnDestroy {
  @Input() backgroundImage: string;
  @Input() backgroundSize = '100% 100%';
  @Input() symbolList: SymbolInfo[] = [];
  @Input() cardList: CardInfo[] = [];
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  @Output() cardResized = new EventEmitter<CardSize>();
  @Output() symbolFocusChanged = new EventEmitter<SymbolInfo>();
  @Output() cardFocusChanged = new EventEmitter<CardInfo>();

  constructor(private tagsValueSvc: TagsValueService) {}

  ngOnInit() {
    this.tagsValueSvc.connectWs();
  }

  ngOnDestroy() {
    this.tagsValueSvc.disconnectWs();
  }

  onSymbolMoved(e, symbolId) {
    e.symbolId = symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e, symbolId) {
    e.symbolId = symbolId;
    this.symbolResized.emit(e);
  }

  onSymbolFocus(symbolInfo: SymbolInfo) {
    if (this.isEditMode && !symbolInfo.isFocus) {
      symbolInfo.isFocus = true;
      this.symbolFocusChanged.emit(symbolInfo);
    }
  }

  loseSymbolFocus(symbolInfo: SymbolInfo) {
    if (symbolInfo.isFocus) {
      symbolInfo.isFocus = false;
      this.symbolFocusChanged.emit(symbolInfo);
    }
  }

  onCardResized(e, cardId) {
    e.cardId = cardId;
    this.cardResized.emit(e);
  }

  onCardFocus(cardInfo: CardInfo) {
    if (this.isEditMode && !cardInfo.isFocus) {
      cardInfo.isFocus = true;
      this.cardFocusChanged.emit(cardInfo);
    }
  }

  loseCardFocus(cardInfo: CardInfo) {
    if (cardInfo.isFocus) {
      cardInfo.isFocus = false;
      this.cardFocusChanged.emit(cardInfo);
    }
  }
}
