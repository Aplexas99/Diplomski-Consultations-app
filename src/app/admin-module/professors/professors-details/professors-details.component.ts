import { Component, Inject } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { ProfessorsService } from '../service/professors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-professors-details',
  templateUrl: './professors-details.component.html',
  styleUrls: ['./professors-details.component.scss']
})
export class ProfessorsDetailsComponent {
  isLoading: boolean = false;
  professor: Professor = new Professor();
  courses: Course[] = [];
  professorId: number = 0;
  noCourses: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private professorService: ProfessorsService,
    private errorHandler: ErrorHandlerService,
    private matDialog: MatDialog,
    private snackBar: SnackBarService,
    private confirmDialog: ConfirmDialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.professorId = this.route.snapshot.params['id'];
    this.loadProfessor();
  }

  loadProfessor() {
    this.isLoading = true;
    this.professorService.getProfessor(this.professorId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.professor = res.professor;
        this.checkIfProfessorHasCourses();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  checkIfProfessorHasCourses() {
    if (this.professor.courses!.length == 0) {
      this.noCourses = true;
    } else {
      this.noCourses = false;
    }
    return;
  }

  openAddCourseForm() {
    this.isLoading = true;
    this.matDialog.open(AddCourseFormComponent,
      {
        data: {
          professorId: this.professorId,
          filterCourses: this.professor.courses,
        }
      }).afterClosed().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.loadProfessor();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorHandler.process(error);
        }
      });
  }

  deleteCourse(course: Course) {
    this.isLoading = true;
    if (!course.id) {
      return;
    }
    this.confirmDialog.open('Are you sure you want to delete this course?',
      'Delete', 'Cancel', { width: "auto", disableClose: true }).subscribe({
        next: (res: any) => {
          if (!res) {
            this.isLoading = false;
            return;
          }
          this.professorService.deleteCourseFromProfessor(this.professorId, course.id!).subscribe({
            next: (res) => {
              this.isLoading = false;
              this.snackBar.open('Course deleted successfully', {
                duration: 3000,
              })
              this.professor = res.professor;
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

  openCourseDetails(course: Course) {
    this.router.navigate(['courses/' + course.id]);
  }
}




