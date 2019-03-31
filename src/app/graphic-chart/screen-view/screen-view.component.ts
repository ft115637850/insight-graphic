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

  connect() {
    if (this.socket) {
      this.socket.close();
    }
    this.socket = new WebSocket('ws://localhost:5000/ws');
    this.socket.onopen = e => {
      console.log('websocket open');
      this.socket.send('time');
    };
    this.socket.onclose = e => {
      console.log('websocket closed');
    };
    this.socket.onerror = e => {
      console.error('websocket error');
    };
    this.socket.onmessage = e => {
      // this.currentValue = parseInt(e.data, 10);
      // this.updateValueArcData();
    };
  }
}
