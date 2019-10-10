import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComposerViewComponent} from './graphic-composer/composer-view/composer-view.component';

const routes: Routes = [
  {
    path: '',
    component: ComposerViewComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class GraphicChartRoutingModule { }
