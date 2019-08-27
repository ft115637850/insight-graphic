import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';

const routes: Routes = [
  { path: 'graphic-chart', loadChildren: './graphic-chart/graphic-chart.module#GraphicChartModule' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
