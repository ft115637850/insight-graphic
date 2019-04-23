import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-radio-rect',
  templateUrl: './radio-rect.component.html',
  styleUrls: ['./radio-rect.component.scss']
})
export class RadioRectComponent extends SymbolBase implements OnInit, OnDestroy {

  private subscriptionId: string;
  readonly viewBoxWidth = 60;
  readonly viewBoxHeight = 60;
  lightened: boolean;
  constructor(private tagsValueSvc: TagsValueService) { super(); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.lightened = false;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.lightened = tagValue.toLowerCase() === 'true';
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }
}
