import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesTableComponent } from './courses/courses-table/courses-table.component';
import { CoursesFormComponent } from './courses/courses-form/courses-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import{MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    CoursesTableComponent,
    CoursesFormComponent,
    UsersTableComponent,
    UsersFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTableModule,
  ]
})
export class AdminModuleModule { }
