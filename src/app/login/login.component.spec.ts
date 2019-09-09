import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { Router } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TokenService } from '../../../api-client/api/api';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router,      useValue: routerSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
