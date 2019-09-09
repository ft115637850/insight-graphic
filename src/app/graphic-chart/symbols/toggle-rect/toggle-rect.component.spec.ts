import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleRectComponent } from './toggle-rect.component';

describe('ToggleRectComponent', () => {
  let component: ToggleRectComponent;
  let fixture: ComponentFixture<ToggleRectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleRectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleRectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
