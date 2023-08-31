import { Component, Inject } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from '../../courses/service/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ProfessorsService } from '../service/professors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsService } from '../../students/service/students.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent {
  isLoading: boolean = false;
  courses: Course[] = [];
  course: Course = new Course();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      professorId: number,
      studentId: number,
      filterCourses: Course[],
    },
    private professorsService: ProfessorsService,
    private studentsService: StudentsService,
    private dialogRef: MatDialogRef<AddCourseFormComponent>,
    private errorHandler: ErrorHandlerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.professorsService.getCourses().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.courses = res.courses.filter((course) => {
          return !this.data.filterCourses.find((filterCourse) => {
            return filterCourse.id == course.id;
          });
        });
        
        if(this.noAvailableCourses()){
          this.snackBar.open('No available courses', 'Close', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  noAvailableCourses(): boolean {
    return this.courses.length == 0;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    if(!this.course.id){
      this.snackBar.open('Please select a course', 'Close', {
        duration: 3000,
      });
      return;
    }

    if(this.data.professorId){
      this.addCourseToProfessor();
    }
    else if(this.data.studentId){
      this.addCourseToStudent();
    }
  }   
  
  addCourseToProfessor() {
    this.isLoading = true;
    this.professorsService.addCourseToProfessor(this.data.professorId, this.course.id!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Course added successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(res);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  addCourseToStudent() {
    this.isLoading = true;
    let student = new Student();
    student.id = this.data.studentId;
    this.studentsService.addCourseToStudent(student, this.course).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Course added successfully', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(res);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  compareModels(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id == o2.id;
  }
}
