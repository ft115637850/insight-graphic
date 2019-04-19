import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagInfo } from '../../../interfaces/tag-info.data';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  @Output() addingTagMoved = new EventEmitter<any>();
  @Input() tagList: TagInfo[];
  constructor() {}

  ngOnInit() {
  }

  onAddingTag(e) {
    this.addingTagMoved.emit(e.pointerPosition);
  }
}
