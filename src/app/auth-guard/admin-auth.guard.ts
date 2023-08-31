import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { AdminAuthService } from '../login/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AdminAuthService,
    public errorHandler: ErrorHandlerService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
     let isAdmin = this.authService.isLoggedIn();

     if(!isAdmin) {
      this.router.navigate(['']);
    }
    return isAdmin;
  }
}
