import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';
import {SymbolInfo} from '../../../interfaces/symbol-info.data';

@Component({
  selector: 'app-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss']
})
export class LabelTextComponent implements OnInit, OnDestroy {
  private subscriptionId: string;
  private currentValue: string;
  readonly viewBoxWidth = 53;
  readonly viewBoxHeight = 23;
  @Input() symbolInfo: SymbolInfo;
  @Input() isEditMode: boolean;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  unit: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) { }

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
