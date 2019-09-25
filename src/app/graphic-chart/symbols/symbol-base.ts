import { Input, OnDestroy } from '@angular/core';
import {SymbolInfo} from '../interfaces/symbol-info.data';
import {TagsValueService} from '../services/tags-value.service';

export class SymbolBase implements OnDestroy {
  protected subscriptionId: string;
  @Input() symbolInfo: SymbolInfo;
  unit: string;
  max: number;
  min: number;
  pathStroke: string;
  valueStroke: string;

  constructor(protected tagsValueSvc: TagsValueService) { }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }
}
