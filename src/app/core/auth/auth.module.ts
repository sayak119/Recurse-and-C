import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './auth.service';
import {JwtService} from './jwt.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthInterceptorService} from './auth-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RedirectService} from './redirect.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    JwtService,
    AuthGuardService,
    RedirectService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  declarations: []
})
export class AuthModule { }
