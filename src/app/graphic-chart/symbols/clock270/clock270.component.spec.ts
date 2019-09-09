import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock270Component } from './clock270.component';

describe('Clock270Component', () => {
  let component: Clock270Component;
  let fixture: ComponentFixture<Clock270Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clock270Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock270Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
