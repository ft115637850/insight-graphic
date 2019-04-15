import { Component, OnInit } from '@angular/core';
import { TagInfo } from '../../../interfaces/tag-info.data';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
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
      }
    ];
  }

  ngOnInit() {
  }

}
