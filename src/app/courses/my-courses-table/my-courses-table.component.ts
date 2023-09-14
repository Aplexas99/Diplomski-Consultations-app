import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoursesTableFilter } from 'src/app/admin-module/courses/courses-table/courses-table.component';
import { CourseService } from 'src/app/admin-module/courses/service/course.service';
import { Course } from 'src/app/models/course';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-my-courses-table',
  templateUrl: './my-courses-table.component.html',
  styleUrls: ['./my-courses-table.component.scss']
})
export class MyCoursesTableComponent {

  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'settings'];
  dataSource!: MatTableDataSource<Course>;
  displayedSearchColumns: string[] = ['search-by-name', 'settings-filter-header'];
  
  filter: CoursesTableFilter = {
    name: '',
  };
  
  userId?: number;
  pagination = {
    pageSizeOptions: [10, 50, 100, 200, 500],
    defaultPageSize: 50,
    totalResults: 0,
  };
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public courseService: CourseService,
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
      this.getCourses();
    });


    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.getCourses();
    });

    setTimeout(() => {
      if(this.sort) {
        this.sort.sort({ id: 'name', start: 'asc', disableClear: false });
      }
    });
  }


  getCourses() {
    this.isLoading = true;
    this.courseService.getCoursesForLoggedInUser(
      {
        filter: this.filter,
        perPage: this.paginator ? this.paginator.pageSize : this.pagination.defaultPageSize,
        pageIndex: (this.paginator ? this.paginator.pageIndex : 0) + 1,
        sortBy: this.sort?.active ?? '',
        sortDirection: this.sort ? this.sort.direction : 'asc', 
      }
    ).subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data.courses);
        this.pagination.totalResults = data.meta.total;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }

  openCourseDetails(course: Course) {
    this.router.navigate(['/app/student/course', course.id]);
  }
  
}
