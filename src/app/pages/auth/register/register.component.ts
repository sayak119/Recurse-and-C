import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

class RegisterFormModel {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public passwordConfirm: string
  ) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  model = new RegisterFormModel('', '', '', '');

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full');
  }

}
