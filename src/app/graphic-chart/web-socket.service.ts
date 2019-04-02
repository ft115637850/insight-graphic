import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private lastReqData: Array<string> = [];
  private isConnected = false;
  constructor() { }
  connect(url: string,
          openReqData: string,
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
      this.socket.send(openReqData);
      this.lastReqData.forEach(d => this.socket.send(d));
      this.lastReqData = [];
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
    this.socket.onmessage = e => {
      const reqData = onMsg(e);
      // if (reqData !== null) {
      //   this.socket.send(reqData);
      // } else {
      //   this.disconnect(url);
      // }
    };
  }

  sendRequest(reqData: string) {
    if (this.socket && this.isConnected) {
      this.socket.send(reqData);
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
