import { Component } from '@angular/core';
import {ToggleComponent} from '../toggle/toggle.component';

@Component({
  selector: 'app-radio-circle',
  templateUrl: './radio-circle.component.html',
  styleUrls: ['./radio-circle.component.scss']
})
export class RadioCircleComponent extends ToggleComponent {}
