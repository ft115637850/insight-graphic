import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagsValueService {

  constructor() { }
  subscribe(tagName: string, fn: (e: MessageEvent) => void) {
  }
  unSubscribe(tagName: string) {}

  connectWs() {}
  disconnectWs() {}
}
