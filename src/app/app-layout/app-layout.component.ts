import { ErrorHandlerService } from './../services/error-handler/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
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
  ) {}

  ngOnInit() { }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate([ '/login' ]);
  }

}
export class MatMenuListItem {
  id: number | undefined;
  name: string | undefined;
}