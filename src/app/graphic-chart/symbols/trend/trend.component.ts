import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../../interfaces/symbol-info.data';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit, OnDestroy {

  private intervalSubscriber;
  private currentValue: number;
  private subscriptionId: string;
  private xAxisMax = 150;
  private xAxisMin = 0;
  private yAxisMax = 100;
  private yAxisMin = 0;
  private timeRange = 60; // unit Second (* scale factor?)
  private ValuePts = [{x: 150, y: 0}];
  readonly viewBoxWidth = 150;
  readonly viewBoxHeight = 100;
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  @Output() symbolFocusChanged = new EventEmitter<SymbolInfo>();
  unit: string;
  max: number;
  min: number;
  valuePath: string;
  valueAreaPath: string;
  pathStroke: string;
  valueStroke: string;

  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.ValuePts[this.ValuePts.length - 1].y = this.getLastY();
    });
    this.currentValue = 0;
    this.unit = 'Pa';

    this.intervalSubscriber = interval(1000).subscribe(() => {
      if (!this.max) {// no value arrived yet
        return;
      }
      this.ValuePts.forEach(pt => pt.x = pt.x - this.xAxisMax / this.timeRange);
      this.ValuePts = this.ValuePts.filter(pt => pt.x > -20);
      this.ValuePts.push({x: 150, y: this.getLastY()});
      this.updatePath();
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
    this.intervalSubscriber.unsubscribe();
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolResized.emit(e);
  }

  onFocus() {
    if (this.isEditMode && !this.symbolInfo.isFocus) {
      this.symbolInfo.isFocus = true;
      this.symbolFocusChanged.emit(this.symbolInfo);
    }
  }

  loseFocus() {
    if (this.symbolInfo.isFocus) {
      this.symbolInfo.isFocus = false;
      this.symbolFocusChanged.emit(this.symbolInfo);
    }
  }

  private getLastY(): number {
    return this.yAxisMax - (this.currentValue - this.min) * (this.yAxisMax - this.yAxisMin) / (this.max - this.min);
  }

  private updatePath() {
    const initPt = this.ValuePts[0];
    this.valuePath = this.ValuePts.slice(1).reduce((p, c) => `${p} L${c.x},${c.y}`, `M${initPt.x},${initPt.y}`);
    this.valueAreaPath = `${this.valuePath} L${this.xAxisMax},${this.yAxisMax} L${initPt.x},${this.yAxisMax}`;
  }
}
