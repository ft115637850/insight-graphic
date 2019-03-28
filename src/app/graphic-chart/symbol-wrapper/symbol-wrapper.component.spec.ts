import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolWrapperComponent } from './symbol-wrapper.component';

describe('SymbolWrapperComponent', () => {
  let component: SymbolWrapperComponent;
  let fixture: ComponentFixture<SymbolWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
