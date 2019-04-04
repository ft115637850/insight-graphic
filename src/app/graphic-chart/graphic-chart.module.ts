import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolWrapperComponent } from './symbols/symbol-wrapper/symbol-wrapper.component';
import { GraphicChartRoutingModule } from './graphic-chart-routing.module';
import { SymbolDragableDirective } from '../directives/symbol-dragable.directive';
import { SymbolResizableDirective } from '../directives/symbol-resizable.directive';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { TrendComponent } from './symbols/trend/trend.component';
import { Clock360Component } from './symbols/clock360/clock360.component';
import { Clock90Component } from './symbols/clock90/clock90.component';
import { HorizontalBarComponent } from './symbols/horizontal-bar/horizontal-bar.component';
import { RadioCircleComponent } from './symbols/radio-circle/radio-circle.component';
import { RadioRectComponent } from './symbols/radio-rect/radio-rect.component';

@NgModule({
  declarations: [SymbolWrapperComponent,
    SymbolDragableDirective, SymbolResizableDirective,
    ScreenViewComponent, TrendComponent, Clock360Component,
    Clock90Component, HorizontalBarComponent, RadioCircleComponent,
    RadioRectComponent],
  imports: [
    CommonModule,
    GraphicChartRoutingModule
  ]
})
export class GraphicChartModule { }
