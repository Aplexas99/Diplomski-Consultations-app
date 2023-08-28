import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { UsersService } from '../service/users.service';
import { UsersFormComponent } from '../users-form/users-form.component';
import { Role } from 'src/app/models/role';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'last-name','email','role','settings'];
  dataSource!: MatTableDataSource<User>;
  displayedSearchColumns: string[] = ['search-by-name', 'search-by-last-name','search-by-email','search-by-role', 'settings-filter-header'];

  roles: Role[] = [];

  filter: UsersTableFilter = {
    name: '',
    lastName: '',
    email: '',
    role: '',
  };
  
  pagination = {
    pageSizeOptions: [10, 50, 100, 200, 500],
    defaultPageSize: 50,
    totalResults: 0,
  };
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public usersService: UsersService,
    public errorHandler: ErrorHandlerService,
    public snackBar: SnackBarService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }
  ngAfterViewInit(): void {
    
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.loadUsers();
    });


    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.loadUsers();
    });

    setTimeout(() => {
      if(this.sort) {
        this.sort.sort({ id: 'name', start: 'asc', disableClear: false });
      }
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.usersService.getUsers(
      {
        filter: this.filter,
        perPage: this.paginator ? this.paginator.pageSize : this.pagination.defaultPageSize,
        pageIndex: (this.paginator ? this.paginator.pageIndex : 0) + 1,
        sortBy: this.sort?.active ?? '',
        sortDirection: this.sort ? this.sort.direction : 'asc',    }
    ).subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data.users);
        this.pagination.totalResults = data.meta.total;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }

  openCreateForm() {
    this.matDialog.open(UsersFormComponent, {
      width: '600px',
      data: {
        user: null,
        roles: this.roles,
      },
      autoFocus: false,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }
  
  openEditForm(user: User) {
    this.matDialog.open(UsersFormComponent, {
      width: '600px',
      data: {
        user: user,
        roles: this.roles,
      },
      autoFocus: false,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }
  
  deleteUser(event: Event, user: User) {
    event.stopPropagation();
    this.isLoading = true;
    this.usersService.deleteUser(user).subscribe({
      next: () => {
        this.snackBar.open('User deleted successfully');
        this.loadUsers();
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }

  loadRoles() {
    this.isLoading = true;
    this.usersService.getRoles().subscribe({
      next: (data:any) => {
        this.roles = data.roles;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }
}
export interface UsersTableFilter {
    name: string,
    lastName: string,
    email: string,
    role: string,
  };

