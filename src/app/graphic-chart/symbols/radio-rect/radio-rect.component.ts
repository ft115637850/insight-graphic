import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../../interfaces/symbol-info.data';

@Component({
  selector: 'app-radio-rect',
  templateUrl: './radio-rect.component.html',
  styleUrls: ['./radio-rect.component.scss']
})
export class RadioRectComponent implements OnInit, OnDestroy {

  private subscriptionId: string;
  private currentValue: number;
  readonly viewBoxWidth = 60;
  readonly viewBoxHeight = 60;
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  unit: string;
  lightened: boolean;
  pathStroke: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.pathStroke = `rgba(${this.symbolInfo.strokeRGB}, 0.2)`;
    this.valueStroke = `rgba(${this.symbolInfo.strokeRGB}, 1)`;

    this.currentValue = 0;
    this.lightened = false;
    this.subscriptionId = this.tagsValueSvc.subscribe(this.symbolInfo.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
      this.lightened = tagValue.toLowerCase() === 'true';
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.symbolInfo.tagName);
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolInfo.symbolId;
    this.symbolResized.emit(e);
  }

  onFocus() {
    if (this.isEditMode) {
      this.symbolInfo.isFocus = true;
    }
  }
}
