import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddProfessorFormComponent } from './admin-module/courses/add-professor-form/add-professor-form.component';
import { AddStudentFormComponent } from './admin-module/courses/add-student-form/add-student-form.component';
import { CourseDetailsComponent } from './admin-module/courses/course-details/course-details.component';
import { CoursesFormComponent } from './admin-module/courses/courses-form/courses-form.component';
import { CoursesTableComponent } from './admin-module/courses/courses-table/courses-table.component';
import { AddCourseFormComponent } from './admin-module/professors/add-course-form/add-course-form.component';
import { ProfessorsDetailsComponent } from './admin-module/professors/professors-details/professors-details.component';
import { ProfessorsFormComponent } from './admin-module/professors/professors-form/professors-form.component';
import { ProfessorsTableComponent } from './admin-module/professors/professors-table/professors-table.component';
import { StudentDetailsComponent } from './admin-module/students/student-details/student-details.component';
import { StudentsTableComponent } from './admin-module/students/students-table/students-table.component';
import { UsersFormComponent } from './admin-module/users/users-form/users-form.component';
import { UsersTableComponent } from './admin-module/users/users-table/users-table.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppComponent } from './app.component';
import { MyCoursesTableComponent } from './courses/my-courses-table/my-courses-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from './login/adminLogin/admin-login.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfirmDialogTemplateComponent } from './services/confirm-dialog/confirm-dialog-template/confirm-dialog-template.component';
import { InputDialogTemplateComponent } from './services/input-dialog/input-dialog-template/input-dialog-template.component';
import { SnackBarComponent } from './services/snack-bar/snack-bar/snack-bar.component';
import { TranslatePipe } from './services/translations/translate.pipe';
import { UsersTestComponent } from './users-test/users-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MsgDialogComponent } from './services/msg-dialog/msg-dialog/msg-dialog.component';
import { AdminLayoutComponent } from './admin-module/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    MyCoursesTableComponent,
    CoursesTableComponent,
    CoursesFormComponent,
    UsersTableComponent,
    UsersFormComponent,
    ProfessorsTableComponent,
    ProfessorsDetailsComponent,
    ProfessorsFormComponent,
    AddCourseFormComponent,
    CourseDetailsComponent,
    AddProfessorFormComponent,
    AddStudentFormComponent,
    StudentsTableComponent,
    StudentDetailsComponent,
    NavigationComponent,
    DashboardComponent,
    UsersTestComponent,
    LoginComponent,
    SnackBarComponent,
    MsgDialogComponent,
    TranslatePipe,
    InputDialogTemplateComponent,
    ConfirmDialogTemplateComponent,
    AppLayoutComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSortModule,
    MatProgressBarModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
