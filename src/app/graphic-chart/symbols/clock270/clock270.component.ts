import { Component, OnInit, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-clock270',
  templateUrl: './clock270.component.html',
  styleUrls: ['./clock270.component.scss']
})
export class Clock270Component extends SymbolBase implements OnInit, OnDestroy {
  // design value
  private readonly tagNameHeight = 16;
  private readonly startAngle = 0.75;    // Unit PI
  private readonly sweepAngle = 1.5;
  private readonly centerX = 83;
  private readonly centerY = 83 + this.tagNameHeight + 4;
  private readonly r = 75;
  private subscriptionId: string;
  currentX: number;
  currentY: number;
  valueLargeArcFlag: number;
  valuePath = '';
  currentValue: number;
  constructor(private tagsValueSvc: TagsValueService) { super(); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.updateValueArcData();
    this.unit = 'Second';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.updateValueArcData.bind(this)();
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }

  private updateValueArcData() {
    const valueSweepAngle = this.getSweepAngleFromValue(this.min, this.max, this.sweepAngle, this.currentValue);
    const valueEndPt = this.getXYFromAngle(this.centerX, this.centerY, this.r, this.startAngle + valueSweepAngle);
    this.currentX = valueEndPt.x;
    this.currentY = valueEndPt.y;
    this.valueLargeArcFlag = valueSweepAngle > 1 ? 1 : 0;
    this.valuePath = `M 29.96699141100894 156.03300858899107 A 75 75 0 ${this.valueLargeArcFlag} 1 ${this.currentX} ${this.currentY}`;
  }

  private getSweepAngleFromValue(min, max, angle, currentValue) {
    return currentValue / (max - min) * angle;
  }

  private getXYFromAngle(centerX0, centerY0, r0, angle) {
    const x = centerX0 + r0 * Math.cos(angle * Math.PI);
    const y = centerY0 + r0 * Math.sin(angle * Math.PI);
    return { x, y };
  }
}
