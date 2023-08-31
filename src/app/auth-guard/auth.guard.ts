import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthService,
    public errorHandler: ErrorHandlerService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
     let isLoggedIn = this.authService.isLoggedIn();

     if(!isLoggedIn) {
      this.router.navigate(['login']);
    }
    return isLoggedIn;
  }
}
