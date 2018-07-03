import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JwtService} from './jwt.service';

@Injectable()
export class AuthInterceptorService {

  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtService.isAuthenticated()) {
      const jwt = this.jwtService.jwt;
      const authenticatedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwt)});
      return next.handle(authenticatedRequest);
    }
    return next.handle(req);
  }

}
