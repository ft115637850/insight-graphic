import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicChartDlgComponent } from './graphic-chart-dlg.component';

describe('GraphicChartDlgComponent', () => {
  let component: GraphicChartDlgComponent;
  let fixture: ComponentFixture<GraphicChartDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicChartDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicChartDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
