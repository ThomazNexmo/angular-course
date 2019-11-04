// we will import a service (routes) inside this service, so we nees @injectable

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { // paramiter of this angular function
    if (this.authService.isAuth()) { // if the user is auth
      return true;  // this permit the user to navigate
    } else {
      this.router.navigate(['/login']); // if is not auth force redirect
    }
  }

  canLoad(route: Route) { // I use this in app routes, I only load the training component if this function returns true
    if (this.authService.isAuth()) { // if the user is auth
      return true;  // this permit the user to navigate
    } else {
      this.router.navigate(['/login']); // if is not auth force redirect
    }
  }
}
