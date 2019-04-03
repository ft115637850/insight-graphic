import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock360Component } from './clock360.component';

describe('Clock360Component', () => {
  let component: Clock360Component;
  let fixture: ComponentFixture<Clock360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clock360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
