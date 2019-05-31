import { Component, OnInit, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-radio-circle',
  templateUrl: './radio-circle.component.html',
  styleUrls: ['./radio-circle.component.scss']
})
export class RadioCircleComponent extends SymbolBase implements OnInit, OnDestroy {
  private subscriptionId: string;
  lightened: boolean;
  constructor(private tagsValueSvc: TagsValueService) { super(); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.lightened = false;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.lightened = tagValue.toLowerCase() === 'on';
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }
}
