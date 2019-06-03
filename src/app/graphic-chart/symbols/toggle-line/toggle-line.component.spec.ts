import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleLineComponent } from './toggle-line.component';

describe('ToggleLineComponent', () => {
  let component: ToggleLineComponent;
  let fixture: ComponentFixture<ToggleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
