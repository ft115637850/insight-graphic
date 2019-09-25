import { Component, OnInit } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent extends SymbolBase implements OnInit {
  private xAxisMax = 150;
  private xAxisMin = 0;
  currentValue: number;
  valueX: number;
  constructor(protected tagsValueSvc: TagsValueService) { super(tagsValueSvc); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;
    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.valueX = 0;
    this.unit = this.symbolInfo.tagInfo.units;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.valueX = this.getLastX();
    });
  }

  private getLastX(): number {
    return (this.currentValue - this.min) * (this.xAxisMax - this.xAxisMin) / (this.max - this.min);
  }
}
