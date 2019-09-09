import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioRectComponent } from './radio-rect.component';

describe('RadioRectComponent', () => {
  let component: RadioRectComponent;
  let fixture: ComponentFixture<RadioRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
