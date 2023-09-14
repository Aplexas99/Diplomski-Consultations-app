import { LocalStorageWrapperService } from '../services/local-storage-wrapper/local-storage-wrapper.service';
import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../services/http-wrapper/http-wrapper.service';
import { map } from 'rxjs/operators';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    public http: HttpWrapperService,
    public localStorage: LocalStorageWrapperService,
    private loggedInUserService: LoggedInUserService,
  ) { }

  login(emailOrUsername:string, password:string ) {
    let data = {
      email_or_username: emailOrUsername,
      password: password
    };
    return this.http.post('admin/login', { data: data }).pipe(map((result: { data: { admin_api_token: string, user: any}}) => {
        this.setSession(result.data.admin_api_token);
        this.localStorage.set('user', result.data.user);
      }));
  }

  setSession(apiToken?: string) {
    if(apiToken) {
      this.localStorage.set('api_token', apiToken);
    }
    else {
      apiToken = this.localStorage.get('api_token');
    }
    if(apiToken) {
      this.http.setApiToken(apiToken);
    }
  }

  getApiToken() {
    return this.localStorage.get('api_token');
  }

  logout() {
    this.loggedInUserService.clearUserDetails();
    this.localStorage.remove("api_token");
    return this.http.post('logout');
  }

  isLoggedIn() {
    return !!this.localStorage.get("api_token");
  }

  sendResetPasswordLink(email: string) {
    return this.http.post('send-reset-password-link', { email: email });
  }

  resetPassword(data: {
    emailOrUsername: string,
    password: string,
    password_confirmation: string,
    token: string,
  }) {
    return this.http.post('reset-password', data);
  }
}
