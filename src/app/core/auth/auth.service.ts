import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/User';

@Injectable()
export class AuthService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly user: Observable<User> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {
    if(this.jwtService.isAuthenticated())
      this.userSubject.next(this.jwtService.user);
  }

  public login({ email, password }): Observable<any> {

    // TODO - implement an authentication server!
    return new Observable( obs => {
      let user = { email, name: 'Sayak Kundu', image: null }
      this.jwtService.setSession(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o",
        user
      )
      this.userSubject.next(user)
      obs.next(user)
      obs.complete()
    })
  }

  public register() {
    // TODO - implement an authentication server!
  }

  public logout(): void {
    this.jwtService.clearSession()
    this.router.navigate(['/auth/login'])
  }

}
