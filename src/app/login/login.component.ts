import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { switchMap, tap } from 'rxjs';
import { MsgDialogService } from '../services/msg-dialog/msg-dialog.service';
import { SnackBarService } from '../services/snack-bar/snack-bar.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
      this.router.navigate([ '/app' ]);
    }
  }

  onSubmit() {
    if(this.loginForm.valid && this.emailOrUsername && this.password) {
      this.isLoading = true;
      this.snackBar.open('Prijavljujem se...');
      /*
      this.authService.loginGoogle().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.snackBar.dismiss();
          console.log(res);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorHandler.process(error);
        },
      });
      */
      this.authService.login(this.emailOrUsername, this.password)
        .pipe(
          tap(_ => this.authService.setSession()),
          switchMap(_ => this.loggedInUserService.details()),
        )
        .subscribe({
          next: (user) => {
            this.isLoading = false;
            this.snackBar.dismiss();
             
    this.authService.getGoogleAuthUrl().subscribe({
      next: (res) => {
        window.open(res, "_self");
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      }
    });
          },
          error: (error) => {
            this.isLoading = false;
            this.errorHandler.process(error);
          },
        });
        
    }
  }

}
