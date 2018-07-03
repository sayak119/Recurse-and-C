import {Routes} from '@angular/router';
import {AuthGuardService} from '../core/auth/auth-guard.service';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: './main/main.module#MainModule'
  }
];
