import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardInfo } from '../../interfaces/card-info.data';

@Component({
  selector: 'app-card-properties',
  templateUrl: './card-properties.component.html',
  styleUrls: ['./card-properties.component.scss']
})
export class CardPropertiesComponent implements OnInit {
  @Output() cardChanged = new EventEmitter<any>();
  @Output() cardRemoved = new EventEmitter<CardInfo>();
  @Input() focusedCard: CardInfo;

  constructor() { }

  ngOnInit() {
  }

  onRemoveCard() {
    this.cardRemoved.emit(this.focusedCard);
  }
  onOrderChange(e) {
    const newCard =  {
      ...this.focusedCard,
      zOrder: e
    } as CardInfo;
    this.cardChanged.emit({oldCard: this.focusedCard, newCard});
  }

  onAlphaChange(e) {
    const newCard =  {
      ...this.focusedCard,
      alpha: e
    } as CardInfo;
    this.cardChanged.emit({oldCard: this.focusedCard, newCard});
  }
}
