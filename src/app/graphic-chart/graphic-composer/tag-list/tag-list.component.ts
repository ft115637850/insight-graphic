import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TagInfo } from '../../../interfaces/tag-info.data';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  @Output() addingTagMoved = new EventEmitter<any>();
  tagList: TagInfo[];
  constructor() {
    this.tagList = [{
        tagId: '123456',
        tagName: 'SysTimeSec',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '789012',
        tagName: 'Pressure',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '189012',
        tagName: 'SinTrend',
        alias: '',
        units: 'Seconds',
        max: 59,
        min: 0,
        dataType: 'Analog',
        source: 'Wuhan Water Plant',
        description: 'Datetime seconds',
        location: '\\Quebec\\Pointe-Claire'
      },
      {
        tagId: '189013',
        tagName: 'changingString',
        alias: '',
        units: '',
        max: 0,
        min: 0,
        dataType: 'String',
        source: 'Wuhan Water Plant',
        description: 'label string',
        location: '\\Quebec\\Pointe-Claire'
      }
    ];
  }

  ngOnInit() {
  }

  onAddingTag(e) {
    this.addingTagMoved.emit(e.pointerPosition);
  }
}
