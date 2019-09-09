import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock180Component } from './clock180.component';

describe('Clock180Component', () => {
  let component: Clock180Component;
  let fixture: ComponentFixture<Clock180Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Clock180Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock180Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
