import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/admin-module/courses/service/course.service';
import { Course } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-student-course-details',
  templateUrl: './student-course-details.component.html',
  styleUrls: ['./student-course-details.component.scss']
})
export class StudentCourseDetailsComponent {
  isLoading: boolean = false;
  course: Course = new Course();
  professors: Professor[] = [];
  courseId: number = 0;

  noProfessors: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
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

  openProfessorDetails(professor: Professor){
    this.router.navigate(['app/student/professor', professor.id]);
  }
}
