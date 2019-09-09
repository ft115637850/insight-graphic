import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerViewComponent } from './composer-view.component';

describe('ComposerViewComponent', () => {
  let component: ComposerViewComponent;
  let fixture: ComponentFixture<ComposerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
