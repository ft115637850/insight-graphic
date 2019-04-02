import { Component, OnInit, OnDestroy } from '@angular/core';
import {TagsValueService} from '../tags-value.service';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.scss']
})
export class ScreenViewComponent implements OnInit, OnDestroy {
  private socket: WebSocket;
  constructor(private tagsValueSvc: TagsValueService) {}

  ngOnInit() {
    this.tagsValueSvc.connectWs();
  }

  ngOnDestroy() {
    this.tagsValueSvc.disconnectWs();
  }
}
