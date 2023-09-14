import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorsService } from 'src/app/admin-module/professors/service/professors.service';
import { ConsultationRequestFormComponent } from 'src/app/consultation-request-form/consultation-request-form.component';
import { Course } from 'src/app/models/course';
import { Professor } from 'src/app/models/professor';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-student-professor-details',
  templateUrl: './student-professor-details.component.html',
  styleUrls: ['./student-professor-details.component.scss']
})
export class StudentProfessorDetailsComponent {
  isLoading: boolean = false;
  professor: Professor = new Professor();
  courses: Course[] = [];
  professorId: number = 0;
  noCourses: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private professorService: ProfessorsService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    public matDialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.professorId = this.route.snapshot.params['id'];
    this.professor.id = this.professorId;
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

  openSendConsultationRequestForm() {
    this.isLoading = true;
    this.matDialog.open(ConsultationRequestFormComponent, {
      width: '500px',
      autoFocus: false,
      disableClose: true,
      data: {
        professor: this.professor,
      },
    }).afterClosed().subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }
  openCourseDetails(course: Course) {
    this.router.navigate(['/app/student/course', course.id]);
  }
}

