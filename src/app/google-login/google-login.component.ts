import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageWrapperService } from '../services/local-storage-wrapper/local-storage-wrapper.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent {
  
  code: string = '';
    constructor(
      private route: ActivatedRoute,
      public authService: AuthService,
      public errorHandler: ErrorHandlerService,
      public cookieService: CookieService,
      private localStorage: LocalStorageWrapperService,
    ) { }
  
    ngOnInit(): void {
      this.getAccessToken();
      this.loginWithGoogleCode();
    }

    getAccessToken(){
      if(this.route.snapshot.queryParams['code'] == null) {
        return;
      }
  this.code = this.route.snapshot.queryParams['code'];
          this.localStorage.set('code', this.code);
      
          console.log(this.route.queryParamMap.forEach((value) => {
            console.log(value);
          }
          ));
    }

    loginWithGoogleCode() {
      this.authService.loginWithGoogleCode(this.code).subscribe({
        next: (res) => {
          console.log(res);
        }
      });
    }
}
