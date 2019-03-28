import { Component, OnInit } from '@angular/core';

// design value
const tagNameHeight = 16;
const startAngle = 0.75;    // Unit PI
const sweepAngle = 1.5;
const centerX = 83;
const centerY = 83 + tagNameHeight + 4;
const r = 75;

@Component({
  selector: 'app-symbol-wrapper',
  templateUrl: './symbol-wrapper.component.html',
  styleUrls: ['./symbol-wrapper.component.scss']
})
export class SymbolWrapperComponent implements OnInit {
  private currentValue: number;
  tagName: string;
  unit: string;
  max: number;
  min: number;
  currentX: number;
  currentY: number;
  valueLargeArcFlag: number;
  valuePath = 'M 29.96699141100894 156.03300858899107 A 75 75 0 1 1 153.88495080547727 78.49849495836901';
  constructor() { }

  ngOnInit() {
    this.min = 0;
    this.max = 59;
    this.currentValue = 45;
    this.updateValueArcData();
    this.tagName = 'ARUNKUMARN03.SysTimeSec';
    this.unit = 'Second';
  }

  changeValue() {
    this.unit = 'Minutes';
    this.currentValue = this.currentValue + 1;
    if (this.currentValue === 60) {
      this.currentValue = 0;
    }
    this.updateValueArcData();
  }

  private updateValueArcData() {
    const valueSweepAngle = this.getSweepAngleFromValue(this.min, this.max, sweepAngle, this.currentValue);
    const valueEndPt = this.getXYFromAngle(centerX, centerY, r, startAngle + valueSweepAngle);
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
