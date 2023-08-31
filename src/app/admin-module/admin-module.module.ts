import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesTableComponent } from './courses/courses-table/courses-table.component';
import { CoursesFormComponent } from './courses/courses-form/courses-form.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { ProfessorsTableComponent } from './professors/professors-table/professors-table.component';
import { ProfessorsDetailsComponent } from './professors/professors-details/professors-details.component';
import { ProfessorsFormComponent } from './professors/professors-form/professors-form.component';
import { AddCourseFormComponent } from './professors/add-course-form/add-course-form.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { AddProfessorFormComponent } from './courses/add-professor-form/add-professor-form.component';
import { AddStudentFormComponent } from './courses/add-student-form/add-student-form.component';
import { StudentsTableComponent } from './students/students-table/students-table.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { SharedModule } from '../shared.module';
import { AppModule } from '../app.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppModule,
    MatListModule,
    MatIconModule,
    
  ],
})
export class AdminModuleModule { }