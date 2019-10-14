// we will import a service (routes) inside this service, so we nees @injectable

import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';






Injectable(); // now I can add a constructor to this service

export class AuthService { // alow fake login, inform reports about the login,
  private isAuthenticated: boolean;
  authChange = new Subject<boolean>(); // this tells if user is login or not I subscribe and grab this variable in another components


  constructor( // just because I import @injectable
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
    ) {
  }



  registerUser(authdata: AuthData) { // should be call when the user signUp (register), recive the data type AuthData
    this.afAuth.auth.createUserWithEmailAndPassword(authdata.email, authdata.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
  }

  login(authdata: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authdata.email, authdata.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']); // force to navigate
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']); // force to navigate
  }
}

