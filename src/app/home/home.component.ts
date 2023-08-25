import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  accessToken: any;
  accessTokenDetails: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.accessToken = localStorage.getItem('token');

  }

  ngOnInit(): void { }

  /**
   * Logout the user using laravel passport as backend
   *
   */
  logout(): void {
    this.loading = true;
    this.authService.logout().subscribe((res: any) => {
      this.loading = false;
      // Remove the access token from the localstorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Navigate to login page
      //if user is logged out, redirect to login page
      this.router.navigate(['/login']);

    }, (err: any) => {
      this.loading = false;
    });
  }

}
