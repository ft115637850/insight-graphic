import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicChartListComponent } from './graphic-chart-list/graphic-chart-list.component';

const routes: Routes = [
  {
    path: '',
    component: GraphicChartListComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
