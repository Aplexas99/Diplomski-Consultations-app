import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfAuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public loggedInUser: LoggedInUserService,
    public errorHandler: ErrorHandlerService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
     let user = this.loggedInUser.details();

     let isLoggedIn = user.pipe(map((user) => {
        return user.role?.name === 'Professor';
      }));
     if(!isLoggedIn) {
      this.router.navigate(['login']);
    }
    return isLoggedIn;
  }
}
