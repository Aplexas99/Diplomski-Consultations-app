import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { ConsultationRequest } from '../models/consultationRequest';
import { ConsultationRequestsService } from '../consultation-request-form/service/consultation-requests.service';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { LoggedInUserService } from '../services/logged-in-user/logged-in-user.service';
import { User } from '../models/user';
import { LocalStorageWrapperService } from '../services/local-storage-wrapper/local-storage-wrapper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoading: boolean = false;
  user: User = new User();
  scheduledConsultations: ConsultationRequest[] = [];
  sentRequests: ConsultationRequest[] = [];

  displayedColumns: string[] = ['type','date', 'start_time', 'end_time', 'professor', 'actions'];

  constructor(
    private loggedInUserService: LoggedInUserService,
    private localStorage: LocalStorageWrapperService,
    public consultationRequestsService: ConsultationRequestsService,
    public errorHandler: ErrorHandlerService,
  ) {
  
  }

  ngOnInit() {
    if(this.localStorage.get('user') == null){
      this.loadUser();
    } else {
      this.user = this.localStorage.get('user');
    }
    this.loadScheduledConsultations();
    this.loadSentRequests();
  }

  loadUser(){
    this.isLoading = true;
    this.loggedInUserService.details().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.user = res;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorHandler.process(error);
      }
    });
  }

  loadScheduledConsultations() {
    this.isLoading = true;
    this.consultationRequestsService.getScheduledConsultations().subscribe({
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
    this.consultationRequestsService.getSentRequests().subscribe({
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

}
