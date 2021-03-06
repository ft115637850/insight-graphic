import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GraphicChartRoutingModule } from './graphic-chart-routing.module';
import { SymbolDragableDirective } from './directives/symbol-dragable.directive';
import { SymbolResizableDirective } from './directives/symbol-resizable.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CardResizableDirective } from './directives/card-resizable.directive';
import { ScreenViewComponent } from './screen-view/screen-view.component';
import { TrendComponent } from './symbols/trend/trend.component';
import { Clock360Component } from './symbols/clock360/clock360.component';
import { Clock90Component } from './symbols/clock90/clock90.component';
import { HorizontalBarComponent } from './symbols/horizontal-bar/horizontal-bar.component';
import { RadioCircleComponent } from './symbols/radio-circle/radio-circle.component';
import { RadioRectComponent } from './symbols/radio-rect/radio-rect.component';
import { ComposerViewComponent } from './graphic-composer/composer-view/composer-view.component';
import {MatCardModule, MatSidenavModule, MatButtonModule, MatInputModule,
  MatIconModule, MatSliderModule, MatRadioModule, MatTabsModule, MatExpansionModule, MatSelectModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TagListComponent } from './graphic-composer/tag-list/tag-list.component';
import { LabelTextComponent } from './symbols/label-text/label-text.component';
import { SymbolPropertiesComponent } from './graphic-composer/symbol-properties/symbol-properties.component';
import { Clock270Component } from './symbols/clock270/clock270.component';
import { Clock180Component } from './symbols/clock180/clock180.component';
import { VerticalBarComponent } from './symbols/vertical-bar/vertical-bar.component';
import { ToggleComponent } from './symbols/toggle/toggle.component';
import { ToggleLineComponent } from './symbols/toggle-line/toggle-line.component';
import { ToggleRectComponent } from './symbols/toggle-rect/toggle-rect.component';
import { CardsComponent } from './graphic-composer/cards/cards.component';
import { CardElementComponent } from './card-element/card-element.component';
import { TagService, ResolutionService, BackgroundService, GraphicChartService } from '../../../api-client/api/api';
import { Configuration } from '../../../api-client/configuration';
import { CardPropertiesComponent } from './graphic-composer/card-properties/card-properties.component';

const configurationFactory = () => {
  const token = sessionStorage.getItem('token');
  return new Configuration({accessToken: token});
};

@NgModule({
  declarations: [
    SymbolDragableDirective, SymbolResizableDirective, CardResizableDirective,
    ScreenViewComponent, TrendComponent, Clock360Component,
    Clock90Component, HorizontalBarComponent, RadioCircleComponent,
    RadioRectComponent,
    ComposerViewComponent,
    TagListComponent,
    LabelTextComponent,
    SymbolPropertiesComponent,
    ClickOutsideDirective,
    Clock270Component,
    Clock180Component,
    VerticalBarComponent,
    ToggleComponent,
    ToggleLineComponent,
    ToggleRectComponent,
    CardsComponent,
    CardElementComponent,
    CardPropertiesComponent
  ],
  imports: [
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatRadioModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GraphicChartRoutingModule
  ],
  providers: [
    { provide: Configuration, useFactory: configurationFactory },
    TagService,
    ResolutionService,
    BackgroundService,
    GraphicChartService
  ]
})
export class GraphicChartModule { }
