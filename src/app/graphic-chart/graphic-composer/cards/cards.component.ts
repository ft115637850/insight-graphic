import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Output() addingTagMoved = new EventEmitter<any>();
  colorPalettes = [{
    color: 'rgb(0, 0, 0)',
    colorValue: '0, 0, 0'
  }, {
    color: 'rgb(255, 255, 255)',
    colorValue: '255, 255, 255'
  }, {
    color: 'rgb(244, 67, 54)',
    colorValue: '244, 67, 54'
  }, {
    color: 'rgb(233, 30, 99)',
    colorValue: '233, 30, 99'
  }, {
    color: 'rgb(156, 39, 176)',
    colorValue: '156, 39, 176'
  }, {
    color: 'rgb(103, 58, 183)',
    colorValue: '103, 58, 183'
  }, {
    color: 'rgb(63, 81, 181)',
    colorValue: '63, 81, 181'
  }, {
    color: 'rgb(33, 150, 243)',
    colorValue: '33, 150, 243'
  }, {
    color: 'rgb(3, 169, 244)',
    colorValue: '3, 169, 244'
  }, {
    color: 'rgb(0, 188, 212)',
    colorValue: '0, 188, 212'
  }, {
    color: 'rgb(0, 150, 136)',
    colorValue: '0, 150, 136'
  }, {
    color: 'rgb(76, 175, 80)',
    colorValue: '76, 175, 80'
  }, {
    color: 'rgb(139, 195, 74)',
    colorValue: '139, 195, 74'
  }, {
    color: 'rgb(205, 220, 57)',
    colorValue: '205, 220, 57'
  }, {
    color: 'rgb(255, 235, 59)',
    colorValue: '255, 235, 59'
  }, {
    color: 'rgb(255, 193, 7)',
    colorValue: '255, 193, 7'
  }, {
    color: 'rgb(255, 152, 0)',
    colorValue: '255, 152, 0'
  }, {
    color: 'rgb(255, 87, 34)',
    colorValue: '255, 87, 34'
  }, {
    color: 'rgb(121, 85, 72)',
    colorValue: '121, 85, 72'
  }, {
    color: 'rgb(158, 158, 158)',
    colorValue: '158, 158, 158'
  }, {
    color: 'rgb(96, 125, 139)',
    colorValue: '96, 125, 139'
  }];
  constructor() { }

  ngOnInit() {
  }

  onAddingTag(e) {
    this.addingTagMoved.emit(e.pointerPosition);
  }

}
