import {Injectable} from '@angular/core';

@Injectable()
export class RedirectService {

  getRedirect(): string {
    return localStorage.getItem('redirect')
  }

  setRedirect(route: string) {
    localStorage.setItem('redirect', route)
  }

  deleteRedirect(): void {
    localStorage.removeItem('redirect')
  }

}
