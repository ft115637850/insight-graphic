import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit, OnDestroy {
  private subscriptionId: string;
  private xAxisMax = 150;
  private xAxisMin = 0;
  readonly viewBoxWidth = 151;
  readonly viewBoxHeight = 72;
  @Input() private strokeRGB = '0, 0, 0';
  @Input() positionX = 0;
  @Input() positionY = 0;
  @Input() svgWidth = 100;
  @Input() symbolId = '';
  @Input() tagName: string;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  currentValue: number;
  unit: string;
  max: number;
  min: number;
  valueX: number;
  pathStroke: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.pathStroke = `rgba(${this.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.strokeRGB}, 1)`;
    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.valueX = 0;
    this.unit = 'Second';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.valueX = this.getLastX();
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolId;
    this.symbolResized.emit(e);
  }

  private getLastX(): number {
    return (this.currentValue - this.min) * (this.xAxisMax - this.xAxisMin) / (this.max - this.min);
  }
}
