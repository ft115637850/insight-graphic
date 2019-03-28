import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymbolWrapperComponent } from './symbol-wrapper/symbol-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: SymbolWrapperComponent,
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
