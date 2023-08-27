import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { CourseService } from '../service/course.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesFormComponent } from '../courses-form/courses-form.component';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'settings'];
  dataSource!: MatTableDataSource<Course>;
  displayedSearchColumns: string[] = ['search-by-name', 'settings-filter-header'];

  filter: CoursesTableFilter = {
    name: '',
  };
  
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
  ) {
  }

  ngOnInit(): void {
    this.loadCourses();
  }
  ngAfterViewInit(): void {
    
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.loadCourses();
    });


    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.loadCourses();
    });

    setTimeout(() => {
      if(this.sort) {
        this.sort.sort({ id: 'name', start: 'asc', disableClear: false });
      }
    });
  }

  loadCourses() {
    this.isLoading = true;
    this.courseService.getCourses(
      {
        filter: this.filter,
        perPage: this.paginator ? this.paginator.pageSize : this.pagination.defaultPageSize,
        pageIndex: (this.paginator ? this.paginator.pageIndex : 0) + 1,
        sortBy: this.sort?.active ?? '',
        sortDirection: this.sort ? this.sort.direction : 'asc',    }
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

  openCreateForm() {
    this.matDialog.open(CoursesFormComponent, {
      width: '600px',
      data: {
        course: null,
      },
      autoFocus: false,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadCourses();
      }
    });
  }
  
  openEditForm(course: Course) {
    this.matDialog.open(CoursesFormComponent, {
      width: '600px',
      data: {
        course: course,
      },
      autoFocus: false,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadCourses();
      }
    });
  }
  
  deleteCourse(event: Event, course: Course) {
    event.stopPropagation();
    this.isLoading = true;
    this.courseService.deleteCourse(course).subscribe({
      next: () => {
        this.snackBar.open('Course deleted successfully');
        this.loadCourses();
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }
}
export interface CoursesTableFilter {
    name: string,
  };

