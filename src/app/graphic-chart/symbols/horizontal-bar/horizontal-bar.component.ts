import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent implements OnInit, OnDestroy {
  private subscriptionId: string;
  private xAxisMax = 150;
  private xAxisMin = 0;
  @Input() tagName: string;
  currentValue: number;
  unit: string;
  max: number;
  min: number;
  valueX: number;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.max = maxValue;
      this.min = minValue;
      this.valueX = this.getLastX();
    });
    this.min = 0;
    this.max = 100;
    this.currentValue = 0;
    this.valueX = 0;
    this.unit = 'Second';
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }

  private getLastX(): number {
    return (this.currentValue - this.min) * (this.xAxisMax - this.xAxisMin) / (this.max - this.min);
  }
}
