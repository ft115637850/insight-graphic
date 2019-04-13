import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';

@Component({
  selector: 'app-radio-circle',
  templateUrl: './radio-circle.component.html',
  styleUrls: ['./radio-circle.component.scss']
})
export class RadioCircleComponent implements OnInit, OnDestroy {
  private subscriptionId: string;
  private currentValue: number;
  readonly viewBoxWidth = 60;
  readonly viewBoxHeight = 60;
  @Input() private strokeRGB = '0, 0, 0';
  @Input() positionX = 0;
  @Input() positionY = 0;
  @Input() svgWidth = 100;
  @Input() symbolId = '';
  @Input() tagName: string;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  unit: string;
  lightened: boolean;
  pathStroke: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.pathStroke = `rgba(${this.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.strokeRGB}, 1)`;

    this.currentValue = 0;
    this.lightened = false;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.lightened = tagValue.toLowerCase() === 'true';
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolId;
    this.symbolMoved.emit(e);
  }
}
