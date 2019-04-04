import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';

@Component({
  selector: 'app-radio-rect',
  templateUrl: './radio-rect.component.html',
  styleUrls: ['./radio-rect.component.scss']
})
export class RadioRectComponent implements OnInit, OnDestroy {

  private subscriptionId: string;
  private currentValue: number;
  @Input() tagName: string;
  unit: string;
  lightened: boolean;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.lightened = parseInt(tagValue, 10) === 0 ? true : false ;
    });

    this.currentValue = 0;
    this.lightened = false;
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }
}
