import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';

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
  private subscriptionId: string;
  readonly viewBoxWidth = 190;
  readonly viewBoxHeight = 165;
  @Input() private strokeRGB = '0, 0, 0';
  @Input() positionX = 0;
  @Input() positionY = 0;
  @Input() svgWidth = 100;
  @Input() symbolId = '';
  @Input() tagName: string;
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
    this.pathStroke = `rgba(${this.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.strokeRGB}, 1)`;

    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.updateValueArcData();
    this.unit = 'Second';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.updateValueArcData.bind(this)();
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
