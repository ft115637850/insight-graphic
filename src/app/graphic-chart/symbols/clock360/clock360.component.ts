import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../../interfaces/symbol-info.data';

@Component({
  selector: 'app-clock360',
  templateUrl: './clock360.component.html',
  styleUrls: ['./clock360.component.scss']
})
export class Clock360Component implements OnInit, OnDestroy {

  // design value
  private readonly tagNameHeight = 16;
  private readonly startAngle = 1.5;    // Unit PI
  private readonly sweepAngle = 1.999999;
  private readonly centerX = 83;
  private readonly centerY = 83 + this.tagNameHeight + 4;
  private readonly r = 75;
  private subscriptionId: string;
  readonly viewBoxWidth = 190;
  readonly viewBoxHeight = 182;
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  currentValue: number;
  unit: string;
  max: number;
  min: number;
  currentX: number;
  currentY: number;
  valueLargeArcFlag: number;
  valuePath = '';
  pathStroke: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) {}

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

  onSymbolMoved(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolResized.emit(e);
  }

  onFocus() {
    if (this.isEditMode) {
      this.symbolInfo.isFocus = true;
    }
  }

  private updateValueArcData() {
    const valueSweepAngle = this.getSweepAngleFromValue(this.min, this.max, this.sweepAngle, this.currentValue);
    const valueEndPt = this.getXYFromAngle(this.centerX, this.centerY, this.r, this.startAngle + valueSweepAngle);
    this.currentX = valueEndPt.x;
    this.currentY = valueEndPt.y;
    this.valueLargeArcFlag = valueSweepAngle > 1 ? 1 : 0;
    this.valuePath = `M 82.99999999999999 28 A 75 75 0 ${this.valueLargeArcFlag} 1 ${this.currentX} ${this.currentY}`;
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
