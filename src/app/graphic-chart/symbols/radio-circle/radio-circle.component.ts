import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';

@Component({
  selector: 'app-radio-circle',
  templateUrl: './radio-circle.component.html',
  styleUrls: ['./radio-circle.component.scss']
})
export class RadioCircleComponent implements OnInit, OnDestroy {
  private subscriptionId: string;
  private currentValue: number;
  @Input() tagName: string;
  unit: string;
  lightened: boolean;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.lightened = parseInt(tagValue, 10) === 1 ? true : false ;
    });

    this.currentValue = 0;
    this.lightened = false;
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }

}
