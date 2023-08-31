import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Professor } from 'src/app/models/professor';
import { ProfessorsService } from '../service/professors.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfessorsFormComponent } from '../professors-form/professors-form.component';

@Component({
  selector: 'app-professors-table',
  templateUrl: './professors-table.component.html',
  styleUrls: ['./professors-table.component.scss']
})
export class ProfessorsTableComponent {

  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'last-name','email','settings'];
  dataSource!: MatTableDataSource<Professor>;
  displayedSearchColumns: string[] = ['search-by-name', 'search-by-last-name','search-by-email', 'settings-filter-header'];

  filter: ProfessorsTableFilter = {
    name: '',
    lastName: '',
    email: '',
  };
  
  pagination = {
    pageSizeOptions: [10, 50, 100, 200, 500],
    defaultPageSize: 50,
    totalResults: 0,
  };
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    public professorsService: ProfessorsService,
    public errorHandler: ErrorHandlerService,
    public snackBar: SnackBarService,
    public matDialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    
    this.sort?.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.loadProfessors();
    });


    this.paginator?.page.subscribe(() => {
      window.scroll(0, 0);
      this.loadProfessors();
    });

    setTimeout(() => {
      if(this.sort) {
        this.sort.sort({ id: 'name', start: 'asc', disableClear: false });
      }
    });
  }

  loadProfessors() {
    this.isLoading = true;
    this.professorsService.getProfessors(
      {
        filter: this.filter,
        perPage: this.paginator ? this.paginator.pageSize : this.pagination.defaultPageSize,
        pageIndex: (this.paginator ? this.paginator.pageIndex : 0) + 1,
        sortBy: this.sort?.active ?? '',
        sortDirection: this.sort ? this.sort.direction : 'asc',    }
    ).subscribe({
      next: (data:any) => {
        this.dataSource = new MatTableDataSource(data.professors);
        this.pagination.totalResults = data.meta.total;
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }

  openEditForm(professor: Professor) {
    this.matDialog.open(ProfessorsFormComponent, {
      data: {
        professor: professor,
      },
      width: '600px',
    }).afterClosed().subscribe({
      next: (res) => {
        if(res){
          this.loadProfessors();
        }
        this.isLoading = false;
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  openProfessorsDetails(professor: Professor) {
    this.router.navigate(['/professors/'+ professor.id]);
  }
  
  deleteProfessor(event: Event, professor: Professor) {
    event.stopPropagation();
    this.isLoading = true;
    this.professorsService.deleteProfessor(professor).subscribe({
      next: () => {
        this.snackBar.open('Professor deleted successfully');
        this.loadProfessors();
      },
      error: (error:any) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      },
    });
  }
}
export interface ProfessorsTableFilter {
    name: string,
    lastName: string,
    email: string,
  };
