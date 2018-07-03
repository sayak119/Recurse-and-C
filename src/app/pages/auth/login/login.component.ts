import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {RedirectService} from '../../../core/auth/redirect.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  public formModel

  constructor(
    private authService: AuthService,
    private router: Router,
    private reDirService: RedirectService
  ) {}

  login() {
    this.authService.login({
      email: this.formModel.email,
      password: this.formModel.password
    }).subscribe(
      res => {
        this.router.navigateByUrl(this.reDirService.getRedirect() || '/welcome')
      },
      err => {
        alert("Invalid Login!")
      }
    )
  }

  setupFormModel() {
    this.formModel = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
    document.body.classList.add('page-login-v3', 'layout-full')
    this.setupFormModel()
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-login-v3', 'layout-full')
  }

}
