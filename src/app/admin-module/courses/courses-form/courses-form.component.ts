import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseService } from '../service/course.service';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent {
  isLoading: boolean = false;
  course: Course = new Course();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      course: Course,
    },
    private courseService: CourseService,
    private dialogRef: MatDialogRef<CoursesFormComponent>,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    if(this.data.course){
      this.course = new Course(this.data.course);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  save(){
    this.isLoading = true;
    let request: Observable<{course: Course}>;
    if (this.course.id) {
      request = this.courseService.updateCourse(this.course);
    }
    else {
      request = this.courseService.createCourse(this.course);
    }
    request.subscribe({
      next: (res) => {
      this.isLoading = false;
      this.dialogRef.close(res.course);
    },
    error: (error) => {
      this.isLoading = false;
      this.errorHandler.process(error);
    }});
  }
}
