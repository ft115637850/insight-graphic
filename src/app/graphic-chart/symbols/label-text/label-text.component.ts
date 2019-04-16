import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../../services/tags-value.service';
import { SymbolPosition } from '../../../interfaces/symbol-position.data';
import { SymbolSize } from '../../../interfaces/symbol-size.data';

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
  @Input() private strokeRGB = '0, 0, 0';
  @Input() positionX = 0;
  @Input() positionY = 0;
  @Input() svgWidth = 100;
  @Input() symbolId = '';
  @Input() tagName: string;
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  @Output() symbolResized = new EventEmitter<SymbolSize>();
  unit: string;
  valueStroke: string;
  constructor(private tagsValueSvc: TagsValueService) { }

  ngOnInit() {
    this.valueStroke = `rgba(${this.strokeRGB}, 1)`;

    this.currentValue = '###.##';
    this.subscriptionId = this.tagsValueSvc.subscribe(this.tagName, (tagValue, maxValue, minValue) => {
      this.currentValue = tagValue;
    });
  }

  ngOnDestroy() {
    this.tagsValueSvc.unSubscribe(this.subscriptionId, this.tagName);
  }

  onSymbolMoved(e) {
    e.symbolId = this.symbolId;
    this.symbolMoved.emit(e);
  }

  onSymbolResized(e) {
    e.symbolId = this.symbolId;
    this.symbolResized.emit(e);
  }
}
