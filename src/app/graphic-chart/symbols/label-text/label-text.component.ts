import { Component, OnInit, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss']
})
export class LabelTextComponent extends SymbolBase implements OnInit, OnDestroy {
  private subscriptionId: string;
  currentValue: string;

  constructor(private tagsValueSvc: TagsValueService) { super(); }

  ngOnInit() {
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.currentValue = '###.##';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }
}
