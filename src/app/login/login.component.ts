import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../../api-client/api/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  loginFailed = false;
  constructor(private router: Router, private tokenSvc: TokenService, private fb: FormBuilder) { }

  ngOnInit() {
    // if ( sessionStorage.getItem('token') !== undefined
    //   && sessionStorage.getItem('token') !== null
    //   && sessionStorage.getItem('token') !== '') {
    //   this.router.navigateByUrl('graphic-chart');
    // }
    this.user = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.user.valid) {
      this.tokenSvc.configuration.username = this.user.value.name;
      this.tokenSvc.configuration.password = this.user.value.password;
      this.tokenSvc.getToken().subscribe(token => {
        this.loginFailed = false;
        sessionStorage.setItem('token', token);
        this.router.navigateByUrl('graphic-chart');
      }, e => this.loginFailed = true);
    }
  }
}
