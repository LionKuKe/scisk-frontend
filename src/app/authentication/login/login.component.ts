import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AppService} from '../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  next: string;
  error = '';
  errorMessage: string;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.appService.pageTitle = 'Connexion';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.next = this.route.snapshot.queryParams.returnUrl || '/feature/home';
  }

  showLoading() {
    this.loading = true;
    this.f.email.disable();
    this.f.password.disable();
  }

  hideLoading() {
    this.loading = false;
    this.f.email.enable();
    this.f.password.enable();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.showLoading();
    this.errorMessage = null;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(() => {
        this.hideLoading();
        // this.appRouteService.initRoles();
        this.router.navigate([this.next]).then();
      }, (error: HttpErrorResponse) => {
        this.hideLoading();
        if (error.status === 401) {
          this.errorMessage = `Nom d'utilisateur ou mot de passe incorrect`;
        }
      });
  }

}
