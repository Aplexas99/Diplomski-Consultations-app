import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Professor } from 'src/app/models/professor';
import { CourseService } from '../service/course.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-professor-form',
  templateUrl: './add-professor-form.component.html',
  styleUrls: ['./add-professor-form.component.scss']
})
export class AddProfessorFormComponent {
  isLoading: boolean = false;
  professors: Professor[] = [];
  professor: Professor = new Professor();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      courseId: number,
      courseProfessors: Professor[],
    },
    private courseService: CourseService,
    private dialogRef: MatDialogRef<AddProfessorFormComponent>,
    private errorHandler: ErrorHandlerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors() {
    this.isLoading = true;
    this.courseService.getProfessors().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.professors = res.professors.filter((professor) => {
          return !this.data.courseProfessors.some((courseProfessor) => {
            return courseProfessor.id == professor.id;
          });
        });
        if(this.noAvailableProfessors()){
          this.snackBar.open('No available professors', 'Close', {
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

  noAvailableProfessors(): boolean {
    return this.professors.length == 0;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    if(!this.professor.id){
      this.snackBar.open('Please select a professor', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.courseService.addProfessorToCourse(this.data.courseId, this.professor.id!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.snackBar.open('Professor added successfully', 'Close', {
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
