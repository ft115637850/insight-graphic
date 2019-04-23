import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ComposerViewComponent } from './graphic-composer/composer-view/composer-view.component';
import {MatCardModule, MatSidenavModule, MatButtonModule,
  MatIconModule, MatSliderModule, MatRadioModule, MatTabsModule, MatExpansionModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TagListComponent } from './graphic-composer/tag-list/tag-list.component';
import { LabelTextComponent } from './symbols/label-text/label-text.component';
import { SymbolPropertiesComponent } from './graphic-composer/symbol-properties/symbol-properties.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { Clock270Component } from './symbols/clock270/clock270.component';

@NgModule({
  declarations: [
    SymbolDragableDirective, SymbolResizableDirective,
    ScreenViewComponent, TrendComponent, Clock360Component,
    Clock90Component, HorizontalBarComponent, RadioCircleComponent,
    RadioRectComponent,
    ComposerViewComponent,
    TagListComponent,
    LabelTextComponent,
    SymbolPropertiesComponent,
    ClickOutsideDirective,
    Clock270Component],
  imports: [
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatRadioModule,
    MatTabsModule,
    MatExpansionModule,
    DragDropModule,
    ReactiveFormsModule,
    CommonModule,
    GraphicChartRoutingModule
  ]
})
export class GraphicChartModule { }
