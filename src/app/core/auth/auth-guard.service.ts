import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {JwtService} from './jwt.service';
import {RedirectService} from './redirect.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private redir: RedirectService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // temporary
    // if(1==1) return true

    if(this.jwtService.isAuthenticated()) return true

    this.redir.setRedirect(state.url);
    this.router.navigate(['/auth/login'])
    return false
  }
}
