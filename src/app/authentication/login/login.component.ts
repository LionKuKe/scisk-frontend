import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) {
    this.appService.pageTitle = 'Login v2 - Pages';
  }

  credentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  ngOnInit(): void {
  }

}
