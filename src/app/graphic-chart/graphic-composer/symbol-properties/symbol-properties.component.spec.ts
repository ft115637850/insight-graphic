import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolPropertiesComponent } from './symbol-properties.component';

describe('SymbolPropertiesComponent', () => {
  let component: SymbolPropertiesComponent;
  let fixture: ComponentFixture<SymbolPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
