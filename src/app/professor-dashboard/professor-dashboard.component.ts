import { Component } from '@angular/core';
import { User } from '../models/user';
import { ConsultationRequestsService } from '../consultation-request-form/service/consultation-requests.service';
import { ConsultationRequest } from '../models/consultationRequest';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { LocalStorageWrapperService } from '../services/local-storage-wrapper/local-storage-wrapper.service';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestDetailsFormComponent } from './request-details-form/request-details-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss']
})
export class ProfessorDashboardComponent {
  isLoading: boolean = false;
  user: User = new User();
  scheduledConsultations: ConsultationRequest[] = [];
  sentRequests: ConsultationRequest[] = [];

  displayedColumns: string[] = ['type','date', 'start_time', 'end_time', 'student', 'actions'];

  constructor(
    private loggedInUserService: LoggedInUserService,
    private localStorage: LocalStorageWrapperService,
    public consultationRequestsService: ConsultationRequestsService,
    public errorHandler: ErrorHandlerService,
    public matDialog: MatDialog,
    public route: ActivatedRoute,
  ) {
  
  }

  ngOnInit() {
    
    if(this.localStorage.get('user') == null){
      this.loadUser();
    } else {
      this.user = this.localStorage.get('user');
    this.loadScheduledConsultations();
    this.loadSentRequests();
    }
  }

  loadUser(){
    this.isLoading = true;
    this.loggedInUserService.details().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.user = res;
        this.localStorage.set('user', res);
        this.loadScheduledConsultations();
        this.loadSentRequests();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  loadScheduledConsultations() {
    this.isLoading = true;
    this.consultationRequestsService.getScheduledConsultationsProfessor().subscribe({
      next: (res) => {
        this.scheduledConsultations = res.consultationRequests;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  loadSentRequests() {
    this.isLoading = true;
    this.consultationRequestsService.getSentRequestsProfessor().subscribe({
      next: (res) => {
        this.sentRequests = res.consultationRequests;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  openRequestDetails(request: ConsultationRequest){
    this.matDialog.open(RequestDetailsFormComponent, {
      data: {
        request: request,
        professor: this.user,
      }
    }).afterClosed().subscribe({
      next: (res) => {
        if(res){
          this.loadScheduledConsultations();
          this.loadSentRequests();
        }
      },
      error: (error) => {
        this.errorHandler.process(error);
      }
    });
  }

}
