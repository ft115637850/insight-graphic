import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { Router } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Observable} from 'rxjs';
import { TokenService } from '../../../api-client/api/api';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
  tokenServiceSpy.configuration = {};
  tokenServiceSpy.getToken.and.returnValue(new Observable<string>(observer => {
    observer.next("token");
    observer.complete();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
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

  it('login should navigate to graphic-chart', () => {
    component.user.get('name').setValue('test user name');
    component.user.get('password').setValue('test password');
    component.login();
    const tokenSvc = fixture.debugElement.injector.get(TokenService);
    expect(tokenSvc.configuration.username).toBe('test user name', 'post wrong user name');
    expect(tokenSvc.configuration.password).toBe('test password', 'post wrong password');

    const router = fixture.debugElement.injector.get(Router);
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    // expecting to navigate to graphic-chart
    expect(navArgs).toBe('graphic-chart',
      'should nav to graphic-chart');
  });
});
