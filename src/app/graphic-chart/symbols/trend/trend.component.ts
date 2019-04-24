import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent extends SymbolBase implements OnInit, OnDestroy {

  private intervalSubscriber;
  private subscriptionId: string;
  private xAxisMax = 150;
  private xAxisMin = 0;
  private yAxisMax = 100;
  private yAxisMin = 0;
  private timeRange = 60; // unit Second (* scale factor?)
  private ValuePts = [{x: 150, y: 0}];
  valuePath: string;
  valueAreaPath: string;
  currentValue: number;

  constructor(private tagsValueSvc: TagsValueService) { super(); }

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

  private getLastY(): number {
    return this.yAxisMax - (this.currentValue - this.min) * (this.yAxisMax - this.yAxisMin) / (this.max - this.min);
  }

  private updatePath() {
    const initPt = this.ValuePts[0];
    this.valuePath = this.ValuePts.slice(1).reduce((p, c) => `${p} L${c.x},${c.y}`, `M${initPt.x},${initPt.y}`);
    this.valueAreaPath = `${this.valuePath} L${this.xAxisMax},${this.yAxisMax} L${initPt.x},${this.yAxisMax}`;
  }
}
