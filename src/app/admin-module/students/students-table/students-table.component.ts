import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { StudentsService } from '../service/students.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersFormComponent } from '../../users/users-form/users-form.component';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {

  isLoading: boolean = false;
  displayedColumns: string[] = ['name','jmbag','settings'];
  dataSource!: MatTableDataSource<Student>;
  displayedSearchColumns: string[] = ['search-by-name','search-by-jmbag', 'settings-filter-header'];

  filter: StudentsTableFilter = {
    name: '',
    jmbag: '',
  };
  
  pagination = {
    pageSizeOptions: [10, 50, 100, 200, 500],
    defaultPageSize: 50,
    totalResults: 0,
  };
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public studentService: StudentsService,
    public errorHandler: ErrorHandlerService,
    public snackBar: SnackBarService,
    public matDialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.loadStudents();
    });


    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.loadStudents();
    });

    setTimeout(() => {
      if(this.sort) {
        this.sort.sort({ id: 'name', start: 'asc', disableClear: false });
      }
    });
  }

  loadStudents() {
    this.isLoading = true;
    this.studentService.getStudents(
      {
        filter: this.filter,
        perPage: this.paginator ? this.paginator.pageSize : this.pagination.defaultPageSize,
        pageIndex: (this.paginator ? this.paginator.pageIndex : 0) + 1,
        sortBy: this.sort?.active ?? '',
        sortDirection: this.sort ? this.sort.direction : 'asc',    }
    ).subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data.students);
        this.pagination.totalResults = data.meta.total;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }

  openStudentDetails(student: Student) {
    this.router.navigate(['/students/'+ student.id]);
  }

  
  openEditForm(student: Student) {
    this.matDialog.open(UsersFormComponent, {
      width: '600px',
      data: {
        user: student.user,
        roles: [],
        isUser: false,
        jmbag: student.jmbag,
        student: student,
      },
      autoFocus: false,
    }).afterClosed().subscribe((res) => {
        this.loadStudents();
    });
  }
  
  deleteStudent(event: Event, student: Student) {
    event.stopPropagation();
    this.isLoading = true;
    this.studentService.deleteStudent(student).subscribe({
      next: () => {
        this.snackBar.open('Student deleted successfully');
        this.loadStudents();
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }
}
export interface StudentsTableFilter {
    name: string,
    jmbag: string,
  };
