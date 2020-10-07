import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { JwtHelper } from 'angular2-jwt'

@Injectable({
  providedIn:'root'
})
 export class AuthGuardService implements CanActivate {
  constructor(public router: Router) { }
  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if ( token && token != 'null')
    //return !new JwtHelper().isTokenExpired(token);
    return false;
    }
}
