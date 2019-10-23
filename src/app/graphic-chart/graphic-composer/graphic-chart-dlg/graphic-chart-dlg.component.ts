import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-graphic-chart-dlg',
  templateUrl: './graphic-chart-dlg.component.html',
  styleUrls: ['./graphic-chart-dlg.component.scss']
})
export class GraphicChartDlgComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GraphicChartDlgComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    if (this.data.name) {
      this.dialogRef.close(this.data.name);
    }
  }
}
