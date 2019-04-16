import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTextSampleComponent } from './label-text-sample.component';

describe('LabelTextSampleComponent', () => {
  let component: LabelTextSampleComponent;
  let fixture: ComponentFixture<LabelTextSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTextSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTextSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
