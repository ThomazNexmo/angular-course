// we will import a service (routes) inside this service, so we nees @injectable

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';


@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<fromRoot.State>
    ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { // paramiter of this angular function
    return this.store.select(fromRoot.getIsAuth).pipe(take(1)); // This is return true or false
  }

  canLoad(route: Route) { // I use this in app routes, I only load the training component if this function returns true
    return this.store.select(fromRoot.getIsAuth).pipe(take(1)); // This is return true or false
  }
}
