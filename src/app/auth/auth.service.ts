// we will import a service (routes) inside this service, so we nees @injectable

import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';






Injectable(); // now I can add a constructor to this service

export class AuthService { // alow fake login, inform reports about the login,
  private isAuthenticated: boolean;
  authChange = new Subject<boolean>(); // this tells if user is login or not I subscribe and grab this variable in another components


  constructor( // just because I import @injectable
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    // inject the store
    private store: Store<{ui: fromApp.State}> // store is a generic type and we can define how it will locks like
    ) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']); // force to navigate
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']); // force to navigate
      }
    })
  }

  registerUser(authdata: AuthData) { // should be call when the user signUp (register), recive the data type AuthData
    // this.uiService.loadingStateChanged.next(true);
    // actions are always an abject ho have a type
    this.store.dispatch({ type: 'START_LOADING' });
    this.afAuth.auth.createUserWithEmailAndPassword(authdata.email, authdata.password)
    .then(result => {
      console.log(result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
    })
    .catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.uiService.showSnackBar(error.message, null, 3000);
      // this.snackbar.open(error.message, null, {
      //   duration: 3000
      // });
      console.log(error);
    });
  }

  login(authdata: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    this.afAuth.auth.signInWithEmailAndPassword(authdata.email, authdata.password)
    .then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
      console.log(result);
    })
    .catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING' });
      this.uiService.showSnackBar(error.message, null, 3000);
      // this.snackbar.open(error.message, null, {
      //   duration: 3000
      // });
      console.log(error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}

