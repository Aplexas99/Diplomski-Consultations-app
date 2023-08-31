import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { StudentsService } from '../service/students.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog/confirm-dialog.service';
import { AddCourseFormComponent } from '../../professors/add-course-form/add-course-form.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  isLoading: boolean = false;
  student: Student = new Student();
  courses: Course[] = [];
  studentId: number = 0;

  noCourses: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private errorHandler: ErrorHandlerService,
    private matDialog: MatDialog,
    private snackBar: SnackBarService,
    private confirmDialog: ConfirmDialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.loadStudent();
  }

  loadStudent() {
    this.isLoading = true;
    this.studentsService.getStudent(this.studentId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.student = res.student;
        this.checkIfStudentHasCourses();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  checkIfStudentHasCourses() {
    if (this.student.courses!.length == 0) {
      this.noCourses = true;
    }
    else {
      this.noCourses = false;
    }
    return;
  }
    

  openAddCourseForm() {
    this.isLoading = true;
    this.matDialog.open(AddCourseFormComponent,
      {
        data: {
          studentId: this.studentId,
          filterCourses: this.student.courses,
          }
          }).afterClosed().subscribe({
            next: (res) => {
              this.isLoading = false;
              this.loadStudent();
            },
            error: (error) => {
              this.isLoading = false;
              this.errorHandler.process(error);
            }
          });
  }

  deleteCourseFromStudent(course: Course) {
    this.isLoading = true;
    if (!course.id) {
      return;
    }
    this.confirmDialog.open('Are you sure you want to delete course from this student?',
    'Delete', 'Cancel', { width: "auto", disableClose: true}).subscribe({
      next: (res: any) => {
        if (!res) {
          this.isLoading = false;
          return;
        }
      this.studentsService.removeCourseFromStudent(this.student, course).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Course deleted successfully',{
          duration: 3000,
        })
        this.student = res.student;
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
  openCourseDetails(course: Course){
    this.router.navigate(['courses/'+ course.id]);
  }
}
