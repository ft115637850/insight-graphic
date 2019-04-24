import { Injectable } from '@angular/core';
import {RequestInfo} from '../interfaces/request-info.data';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private lastReqData: Array<RequestInfo> = [];
  private isConnected = false;
  constructor() { }
  connect(url: string,
          token: string,
          onOpen: (ev: Event) => any,
          onMsg: (ev: MessageEvent) => any,
          onClose: (ev: CloseEvent) => any,
          onError: (ev: Event) => any) {
    this.disconnect(url);
    // single connection only
    this.socket = new WebSocket(url);
    this.socket.onopen = e => {
      onOpen(e);
      console.log('websocket open');
      this.isConnected = true;
      this.socket.send(token);
      if (this.lastReqData.length > 0) {
        this.socket.send(JSON.stringify(this.lastReqData));
        this.lastReqData = [];
      }
    };
    this.socket.onclose = e => {
      onClose(e);
      console.log('websocket closed');
      this.isConnected = false;
    };
    this.socket.onerror = e => {
      onError(e);
      console.error('websocket error');
    };
    this.socket.onmessage = e => onMsg(e);
  }

  sendRequest(reqData: RequestInfo) {
    if (this.socket && this.isConnected) {
      this.socket.send(JSON.stringify([reqData]));
    } else {
      this.lastReqData.push(reqData);
    }
  }

  disconnect(url: string) {
    if (this.socket) {
      this.socket.close();
    }
  }
}
