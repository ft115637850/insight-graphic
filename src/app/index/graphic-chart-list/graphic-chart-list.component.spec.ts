import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicChartListComponent } from './graphic-chart-list.component';

describe('GraphicChartListComponent', () => {
  let component: GraphicChartListComponent;
  let fixture: ComponentFixture<GraphicChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
