import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesTableComponent } from './admin-module/courses/courses-table/courses-table.component';
import { UsersTableComponent } from './admin-module/users/users-table/users-table.component';
import { ProfessorsTableComponent } from './admin-module/professors/professors-table/professors-table.component';
import { ProfessorsDetailsComponent } from './admin-module/professors/professors-details/professors-details.component';
import { CourseDetailsComponent } from './admin-module/courses/course-details/course-details.component';
import { StudentsTableComponent } from './admin-module/students/students-table/students-table.component';
import { StudentDetailsComponent } from './admin-module/students/student-details/student-details.component';
import { MyCoursesTableComponent } from './courses/my-courses-table/my-courses-table.component';

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
    path:'courses/:id',
    component: CourseDetailsComponent,
  },
  {
    path:'users',
    component: UsersTableComponent,
  },
  {
    path:'professors',
    component: ProfessorsTableComponent,
  },
  {
    path:'professors/:id',
    component: ProfessorsDetailsComponent,
  },
  {
    path:'students',
    component: StudentsTableComponent,
  },
  {
    path:'students/:id',
    component: StudentDetailsComponent,
  },
  {
    path:'my-courses',
    component: MyCoursesTableComponent,
  },
  {
    path:'student/courses/:id',
    component: CourseDetailsComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
