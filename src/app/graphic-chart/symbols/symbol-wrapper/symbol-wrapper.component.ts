import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';

@Component({
  selector: 'app-symbol-wrapper',
  templateUrl: './symbol-wrapper.component.html',
  styleUrls: ['./symbol-wrapper.component.scss']
})
export class SymbolWrapperComponent implements OnInit, OnDestroy {
  // design value
  private readonly tagNameHeight = 16;
  private readonly startAngle = 0.75;    // Unit PI
  private readonly sweepAngle = 1.5;
  private readonly centerX = 83;
  private readonly centerY = 83 + this.tagNameHeight + 4;
  private readonly r = 75;
  private currentValue: number;
  private subscriptionId: string;
  @Input() tagName: string;
  unit: string;
  max: number;
  min: number;
  currentX: number;
  currentY: number;
  valueLargeArcFlag: number;
  valuePath = 'M 29.96699141100894 156.03300858899107 A 75 75 0 1 1 153.88495080547727 78.49849495836901';
  constructor(private tagsValueSvc: TagsValueService) {}

  ngOnInit() {
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.updateValueArcData.bind(this)();
    });
    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.updateValueArcData();
    this.unit = 'Second';
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
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
