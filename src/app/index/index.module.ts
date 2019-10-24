import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import {MatButtonModule, MatIconModule, MatTableModule, MatMenuModule,
  MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import { GraphicChartService, BackgroundService } from '../../../api-client/api/api';
import { Configuration } from '../../../api-client/configuration';
import { GraphicChartListComponent } from './graphic-chart-list/graphic-chart-list.component';

const configurationFactory = () => {
  const token = sessionStorage.getItem('token');
  return new Configuration({accessToken: token});
};

@NgModule({
  declarations: [GraphicChartListComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: Configuration, useFactory: configurationFactory },
    GraphicChartService,
    BackgroundService
  ]
})
export class IndexModule { }
