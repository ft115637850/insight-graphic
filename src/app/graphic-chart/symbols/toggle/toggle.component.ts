import { Component, OnInit, OnDestroy } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent extends SymbolBase implements OnInit, OnDestroy {

  private subscriptionId: string;
  lightened: boolean;
  currentValue: number;
  constructor(private tagsValueSvc: TagsValueService) { super(); }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.lightened = false;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.lightened = tagValue.toLowerCase() === 'on';
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }
}
