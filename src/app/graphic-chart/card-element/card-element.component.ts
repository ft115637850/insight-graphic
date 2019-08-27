import { Component, OnInit, Input } from '@angular/core';
import { CardInfo } from '../interfaces/card-info.data';

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.scss']
})
export class CardElementComponent implements OnInit {
  @Input() cardInfo: CardInfo;
  cardColor: string;
  constructor() {}

  ngOnInit() {
    this.cardColor = `rgba(${this.cardInfo.strokeRGB}, ${this.cardInfo.alpha})`;
  }

}
