import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from '../service/users.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { ProfessorsService } from '../../professors/service/professors.service';
import { StudentsService } from '../../students/service/students.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  isLoading: boolean = false;
  isUser: boolean = false;
  user: User = new User();
  jmbag: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User,
      student: Student,
      roles: Role[],
      isUser: boolean,
    },
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    private errorHandler: ErrorHandlerService,
    private snackBar: SnackBarService,
    private professorService: ProfessorsService,
    private studentService: StudentsService,
  ) { }

  ngOnInit(): void {
    if (this.data.user) {
      this.user = new User(this.data.user);
    }
    this.isUser = this.data.isUser;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.isLoading = true;
    let request: Observable<{ user: User }>;
    let isUpdate = false;
    if (this.user.id) {
      request = this.usersService.updateUser(this.user);
      isUpdate = true;
    }
    else {
      request = this.usersService.createUser(this.user);
    }
    request.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.user = res.user;
        if (!isUpdate) {
          if (res.user.role!.name == 'Professor') {
            this.createProfessor(res.user.id!);
          }
          else if (res.user.role!.name == 'Student') {
            this.createStudent(res.user.id!);
          }
          this.snackBar.open('User saved successfully',
            { duration: 2000 });
        }
        else {
          if (this.data.student) {
            this.updateStudent(this.data.student.id!);
        }
      }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorHandler.process(error);
        }
      });
  }

  updateStudent(id: number) {
    this.isLoading = true;
    let student = new Student({ id: id, jmbag: this.data.student.jmbag! , user: new User(this.user), courses: [] });
    this.studentService.updateStudent(student).subscribe({
      next: (res) => {
        this.isLoading = false;
        
        this.snackBar.open('Student updated successfully',
        { duration: 2000 });
        this.dialogRef.close(res);
      },
      error: (error) => {
        this.errorHandler.process(error);
      }
    });
  }

  createProfessor(id: number) {
    this.isLoading = true;
    this.professorService.createProfessor(id).subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.errorHandler.process(error);
      }
    });
  }

  createStudent(id: number) {
    this.isLoading = true;
    let student = new Student({ id: id, jmbag: this.jmbag, user: new User(this.user), courses: [] });
    this.studentService.createStudent(student).subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.errorHandler.process(error);
      }
    });
  }
  compareModels(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id == o2.id;
  }
}
