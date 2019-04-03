import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenViewComponent } from './screen-view/screen-view.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenViewComponent,
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
