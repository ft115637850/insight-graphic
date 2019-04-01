import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  constructor() { }
  connect(url: string,
          openReqData: string,
          onOpen: (ev: Event) => any,
          onMsg: (ev: MessageEvent) => string,
          onClose: (ev: CloseEvent) => any,
          onError: (ev: Event) => any) {
    this.disconnect(url);
    // single connection only
    this.socket = new WebSocket(url);
    this.socket.onopen = e => {
      onOpen(e);
      console.log('websocket open');
      this.socket.send(openReqData);
    };
    this.socket.onclose = e => {
      onClose(e);
      console.log('websocket closed');
    };
    this.socket.onerror = e => {
      onError(e);
      console.error('websocket error');
    };
    this.socket.onmessage = e => {
      const reqData = onMsg(e);
      if (reqData !== null) {
        this.socket.send(reqData);
      } else {
        this.disconnect(url);
      }
    };
  }

  disconnect(url: string) {
    if (this.socket) {
      this.socket.close();
    }
  }
}
