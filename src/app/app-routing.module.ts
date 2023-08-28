import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesTableComponent } from './admin-module/courses/courses-table/courses-table.component';
import { UsersTableComponent } from './admin-module/users/users-table/users-table.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
  },
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {
    path:'courses',
    component: CoursesTableComponent,
  },
  {
    path:'users',
    component: UsersTableComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
