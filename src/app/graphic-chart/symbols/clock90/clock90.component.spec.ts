import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock90Component } from './clock90.component';

describe('Clock90Component', () => {
  let component: Clock90Component;
  let fixture: ComponentFixture<Clock90Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clock90Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock90Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
