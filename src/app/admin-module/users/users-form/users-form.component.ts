import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from '../service/users.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  isLoading: boolean = false;
  user: User = new User();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User,
      roles: Role[],
    },
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    private errorHandler: ErrorHandlerService,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
    if(this.data.user){
      this.user = new User(this.data.user);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  save(){
    this.isLoading = true;
    let request: Observable<{user: User}>;

    if (this.user.id) {
      request = this.usersService.updateUser(this.user);
    }
    else {
      request = this.usersService.createUser(this.user);
    }
    request.subscribe({
      next: (res) => {
      this.isLoading = false;
      this.snackBar.open('User saved successfully');
      this.dialogRef.close(res.user);
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
