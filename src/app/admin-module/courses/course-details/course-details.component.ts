import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { CourseService } from '../service/course.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog/confirm-dialog.service';
import { AddProfessorFormComponent } from '../add-professor-form/add-professor-form.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent {
  isLoading: boolean = false;
  course: Course = new Course();
  professors: Professor[] = [];
  courseId: number = 0;

  isAdmin: boolean = true;

  noProfessors: boolean = false;
  noStudents: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private errorHandler: ErrorHandlerService,
    private matDialog: MatDialog,
    private snackBar: SnackBarService,
    private confirmDialog: ConfirmDialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.isAdmin = this.route.snapshot.params['isAdmin'];
    this.loadCourse();
  }

  loadCourse() {
    this.isLoading = true;
    this.courseService.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.course = res.course;
        this.checkIfCourseHasProfessors();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  checkIfCourseHasProfessors() {
    if (this.course.professors!.length == 0) {
      this.noProfessors = true;
    }
    else {
      this.noProfessors = false;
    }
    return;
  }

  openAddProfessorForm() {
    this.isLoading = true;
    this.matDialog.open(AddProfessorFormComponent,
      {
        data: {
          courseId: this.courseId,
          courseProfessors: this.course.professors,
          }
          }).afterClosed().subscribe({
            next: (res) => {
              this.isLoading = false;
              this.loadCourse();
            },
            error: (error) => {
              this.isLoading = false;
              this.errorHandler.process(error);
            }
          });
  }

  deleteProfessorFromCourse(professor: Professor) {
    this.isLoading = true;
    if (!professor.id) {
      return;
    }
    this.confirmDialog.open('Are you sure you want to delete professor form this course?',
    'Delete', 'Cancel', { width: "auto", disableClose: true}).subscribe({
      next: (res: any) => {
        if (!res) {
          this.isLoading = false;
          return;
        }
      this.courseService.removeProfessorFromCourse(this.courseId, professor.id!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Professor deleted successfully',{
          duration: 3000,
        })
        this.course = res.course;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  },
  error: (error: any) => {
    this.isLoading = false;
    this.errorHandler.process(error);
  }
});
}

  openProfessorDetails(professor: Professor){
    this.router.navigate(['professors', professor.id]);
  }
}
