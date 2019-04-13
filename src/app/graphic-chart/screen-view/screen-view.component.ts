import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';
import {SymbolInfo} from '../../interfaces/symbol-info.data';
import { SymbolPosition } from '../../interfaces/symbol-position.data';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit, OnDestroy {
  @Input() backgroundImage: string;
  @Input() backgroundSize = '100% 100%';
  @Input() symbolList: SymbolInfo[] = [];
  @Output() symbolMoved = new EventEmitter<SymbolPosition>();
  private socket: WebSocket;
  constructor(private tagsValueSvc: TagsValueService) {}

  ngOnInit() {
    this.tagsValueSvc.connectWs();
  }

  ngOnDestroy() {
    this.tagsValueSvc.disconnectWs();
  }

  onSymbolMoved(e) {
    this.symbolMoved.emit(e);
  }
}
