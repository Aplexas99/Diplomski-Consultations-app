import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { LoggedInUserService } from 'src/app/services/logged-in-user/logged-in-user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
    public errorHandler: ErrorHandlerService,
    public route: ActivatedRoute,
    public loggedInUser: LoggedInUserService,
  ) {}


  ngOnInit() {
   }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate([ '/login' ]);
  }

}
