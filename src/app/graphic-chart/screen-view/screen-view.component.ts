import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {TagsValueService} from '../../services/tags-value.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit, OnDestroy {
  @Input() backgroundImage: string;
  @Input() backgroundSize = '100% 100%';
  private socket: WebSocket;
  constructor(private tagsValueSvc: TagsValueService) {}

  ngOnInit() {
    this.tagsValueSvc.connectWs();
  }

  ngOnDestroy() {
    this.tagsValueSvc.disconnectWs();
  }
}
