import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolWrapperComponent } from './symbol-wrapper/symbol-wrapper.component';
import { GraphicChartRoutingModule } from './graphic-chart-routing.module';
import { SymbolDragableDirective } from './symbol-dragable.directive';
import { SymbolResizableDirective } from './symbol-resizable.directive';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { TrendComponent } from './trend/trend.component';

@NgModule({
  declarations: [SymbolWrapperComponent, SymbolDragableDirective, SymbolResizableDirective, ScreenViewComponent, TrendComponent],
  imports: [
    CommonModule,
    GraphicChartRoutingModule
  ]
})
export class GraphicChartModule { }
