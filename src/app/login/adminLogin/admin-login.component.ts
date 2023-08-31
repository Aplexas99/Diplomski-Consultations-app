import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { MsgDialogService } from 'src/app/services/msg-dialog/msg-dialog.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { LoggedInUserService } from 'src/app/services/logged-in-user/logged-in-user.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  emailOrUsername?: string;
  password?: string;
  isLoading = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public snackBar: SnackBarService,
    public msgDialog: MsgDialogService,
    public errorHandler: ErrorHandlerService,
    public loggedInUserService: LoggedInUserService,
  ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate([ 'admin' ]);
    }
  }

  onSubmit() {
    if(this.loginForm.valid && this.emailOrUsername && this.password) {
      this.isLoading = true;
      this.snackBar.open('Logging in...');
      this.authService.login(this.emailOrUsername, this.password)
        .pipe(
          tap(_ => this.authService.setSession()),
          switchMap(_ => this.loggedInUserService.details()),
        )
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            this.snackBar.dismiss();
              this.router.navigate([ 'admin' ]);
          },
          error: (error) => {
            this.isLoading = false;
            this.errorHandler.process(error);
          },
        });
    }
  }

}
