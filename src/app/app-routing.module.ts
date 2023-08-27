import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesTableComponent } from './admin-module/courses/courses-table/courses-table.component';

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
    path:'admin',
    component: CoursesTableComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
