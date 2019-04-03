import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {RequestInfo} from './request-info.data';
import {WebSocketService} from './web-socket.service';

interface SubTag {
  subscriptionId: string;
  tagName: string;
  onMsg: (tagValue: string, maxValue: string, minValue: string) => void;
}

interface TagInfo {
  tagName: string;
  value: any;
  max: any;
  min: any;
}

const serverUrl = 'ws://localhost:5000/ws';

@Injectable({
  providedIn: 'root'
})
export class TagsValueService {
  private subscriptionTagList = Array<SubTag>();

  constructor(private ws: WebSocketService) { }

  subscribe(tagName: string, onMsg: (tagValue: any, maxValue: any, minValue: any) => void): string {
    const subscriptionId = uuid.v4();
    this.subscriptionTagList.push({ subscriptionId, tagName, onMsg });
    this.ws.sendRequest({ action: 'subscribe', tagName});
    return subscriptionId;
  }

  unSubscribe(subscriptionId: string, tagName: string) {
    this.ws.sendRequest({ action: 'unsubscribe', tagName});
    this.subscriptionTagList = this.subscriptionTagList.filter(x => x.subscriptionId !== subscriptionId);
  }

  connectWs() {
    this.ws.connect(serverUrl, '', e => {}, e => {
      if (e.data) {
        const tagInfoList = JSON.parse(e.data) as Array<TagInfo>;
        this.subscriptionTagList.forEach(subTag => {
          const tag = tagInfoList.find(tagInfo => tagInfo.tagName === subTag.tagName);
          if (tag) {
            subTag.onMsg(tag.value, tag.max, tag.min);
          }
        });
      }
    }, e => {}, e => {});
  }

  disconnectWs() {
    this.ws.disconnect(serverUrl);
  }
}
