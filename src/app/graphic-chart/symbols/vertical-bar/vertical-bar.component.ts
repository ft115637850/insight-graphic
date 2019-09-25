import { Component, OnInit } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent extends SymbolBase implements OnInit {

  private yAxisMax = 150;
  private yAxisMin = 23;
  currentValue: number;
  valueY: number;
  constructor(protected tagsValueSvc: TagsValueService) { super(tagsValueSvc); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;
    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.valueY = 0;
    this.unit = this.symbolInfo.tagInfo.units;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.valueY = this.getLastY();
    });
  }

  private getLastY(): number {
    return this.yAxisMax - (this.currentValue - this.min) * (this.yAxisMax - this.yAxisMin) / (this.max - this.min);
  }
}
