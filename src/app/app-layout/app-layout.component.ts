import { ErrorHandlerService } from './../services/error-handler/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public errorHandler: ErrorHandlerService,
    public route: ActivatedRoute,
    public loggedInUser: LoggedInUserService,
  ) {}


  ngOnInit() {
    this.loggedInUser.details().subscribe({
      next: (user) => {
        if(user.role?.name == 'Student'){
          this.router.navigate([ 'app/student' ]);
        } else if(user.role?.name == 'Professor'){
          this.router.navigate([ 'app/professor' ]);
        } else {
          this.router.navigate([ 'login' ]);
        }
    },
      error: (error) => {
        this.errorHandler.process(error);
      }
    });
   }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate([ '/login' ]);
  }

}