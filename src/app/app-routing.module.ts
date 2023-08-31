import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './admin-module/courses/course-details/course-details.component';
import { CoursesTableComponent } from './admin-module/courses/courses-table/courses-table.component';
import { ProfessorsDetailsComponent } from './admin-module/professors/professors-details/professors-details.component';
import { ProfessorsTableComponent } from './admin-module/professors/professors-table/professors-table.component';
import { StudentDetailsComponent } from './admin-module/students/student-details/student-details.component';
import { StudentsTableComponent } from './admin-module/students/students-table/students-table.component';
import { UsersTableComponent } from './admin-module/users/users-table/users-table.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AdminAuthGuard } from './auth-guard/admin-auth.guard';
import { AuthGuard } from './auth-guard/auth.guard';
import { MyCoursesTableComponent } from './courses/my-courses-table/my-courses-table.component';
import { AdminLoginComponent } from './login/adminLogin/admin-login.component';
import { UsersTestComponent } from './users-test/users-test.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesTableComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'users',
    component: UsersTableComponent,
  },
  {
    path: 'professors',
    component: ProfessorsTableComponent,
  },
  {
    path: 'professors/:id',
    component: ProfessorsDetailsComponent,
  },
  {
    path: 'students',
    component: StudentsTableComponent,
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
  },
  {
    path: 'my-courses',
    component: MyCoursesTableComponent,
  },
  {
    path: 'student/courses/:id',
    component: CourseDetailsComponent,
  },
  {

    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
  },
  {
    path: 'admin',
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
