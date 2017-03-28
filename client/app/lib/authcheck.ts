import { Injectable } from '@angular/core';
import {
  CanActivate, 
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthCheck implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService,  private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.isUserAuthed(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  isUserAuthed(url) {
    return this.authService.checkUserAuth();
  }
}