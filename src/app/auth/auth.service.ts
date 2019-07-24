// we will import a service (routes) inside this service, so we nees @injectable

import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';






Injectable(); // now I can add a constructor to this service

export class AuthService { // alow fake login, inform reports about the login,
  private user: User;
  authChange = new Subject<boolean>(); // this tells if user is login or not I subscribe and grab this variable in another components


  constructor(private router: Router) { // just because I import @injectable

  }



  registerUser(authdata: AuthData) { // should be call when the user signUp (register), recive the data type AuthData
    this.user = { // inicialize the user
      email: authdata.email,
      userId: Math.round(Math.random() * 10000)
    };
    this.authSuccessfully();
  }

  login(authdata: AuthData) {
    this.user = { // inicialize the user
      email: authdata.email,
      userId: Math.round(Math.random() * 10000)
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']); // force to navigate
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']); // force to navigate
  }
}

