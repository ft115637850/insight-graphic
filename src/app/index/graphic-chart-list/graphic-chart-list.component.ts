import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { GraphicChartService } from '../../../../api-client/api/api';

@Component({
  selector: 'app-graphic-chart-list',
  templateUrl: './graphic-chart-list.component.html',
  styleUrls: ['./graphic-chart-list.component.scss']
})
export class GraphicChartListComponent implements OnInit {
  columnsToDisplay = ['name', 'createdBy', 'lastEditedAt'];
  graphicChartlist = [];

  constructor(private router: Router,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private graphicCharSvc: GraphicChartService) {
    this.iconRegistry.addSvgIcon(
      'side-nav',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/side-nav.svg'))
      .addSvgIcon(
        'admin',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/admin.svg'))
      .addSvgIcon(
        'my-profile',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/my-profile.svg'))
      .addSvgIcon(
        'add',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/add.svg'))
      .addSvgIcon(
        'context-menu',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/context-menu.svg'))
      .addSvgIcon(
        'done',
        this.sanitizer.bypassSecurityTrustResourceUrl('/assets/done.svg'));
   }

  ngOnInit() {
    this.graphicCharSvc.getGraphicChartList().subscribe(e => this.graphicChartlist = e);
  }

  selectGraphicChart(id) {
    console.log(id);
    this.router.navigate(['graphic-chart', { id }]);
  }

}
