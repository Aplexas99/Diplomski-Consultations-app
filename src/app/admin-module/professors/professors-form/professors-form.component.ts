import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Professor } from 'src/app/models/professor';
import { ProfessorsService } from '../service/professors.service';
import { UsersService } from '../../users/service/users.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-professors-form',
  templateUrl: './professors-form.component.html',
  styleUrls: ['./professors-form.component.scss']
})
export class ProfessorsFormComponent {
  isLoading: boolean = false;
  professor: Professor = new Professor();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      professor: Professor,
    },
    private professorsService: ProfessorsService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<ProfessorsFormComponent>,
    private errorHandler: ErrorHandlerService,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
    if(this.data.professor){
      this.professor = new Professor(this.data.professor);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  save(){
    this.isLoading = true;
    this.professorsService.updateProfessor(this.professor).subscribe({
      next: (res) => {
      this.isLoading = false;
      this.snackBar.open('Professor saved successfully',
      { duration: 2000});
      this.dialogRef.close(res.professor);
    },
    error: (error) => {
      this.isLoading = false;
      this.errorHandler.process(error);
    }});
  }

  compareModels(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id == o2.id;
  }
}
