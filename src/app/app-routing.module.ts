import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { UsersTestComponent } from './users-test/users-test.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AdminAuthGuard } from './auth-guard/admin-auth.guard';
import { AdminLoginComponent } from './login/adminLogin/admin-login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'admin/login',
    component: AdminLoginComponent,
  },
  {
    path:'app',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
  },
  {
    path:'admin',
    canActivate: [AdminAuthGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersTestComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
