import { Component, OnInit } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolBase} from '../symbol-base';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss']
})
export class LabelTextComponent extends SymbolBase implements OnInit {
  currentValue: string;

  constructor(protected tagsValueSvc: TagsValueService) { super(tagsValueSvc); }
  ngOnInit() {
    // this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;
    this.valueStroke = `rgba(33, 33, 33, 1)`;

    this.currentValue = '###.##';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
    });
  }
}
