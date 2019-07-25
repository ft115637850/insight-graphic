import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-element',
  templateUrl: './card-element.component.html',
  styleUrls: ['./card-element.component.scss']
})
export class CardElementComponent implements OnInit {
  @Input() strokeRGB: string;
  constructor() { }

  ngOnInit() {
  }

}
