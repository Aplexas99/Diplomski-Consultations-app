import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { map } from 'rxjs';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { ConsultationRequest } from 'src/app/models/consultationRequest';
import { Student } from 'src/app/models/student';
import { Professor } from 'src/app/models/professor';
import { HttpParams } from '@angular/common/http';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})
export class ConsultationRequestsService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  getBookedAppointmentsForProfessor(date: any, professor: Professor){
    let params = {
      date: date,
    }
    return this.http.get('professor/'+ professor.id+'/booked-appointments', {params: params}).pipe(map((res: {data: any[]}) => {
      let consultationRequests: ConsultationRequest[] = res.data.map(item => new ConsultationRequest(item));
      return {
        consultationRequests: consultationRequests,
      };
    }));
  }

  storeConsultationRequest(consultationRequest: ConsultationRequest, professor: Professor, user: User, date: any){
    const formattedDate = new Date(date);
    const localDateStr = formattedDate.toLocaleDateString();

    let data = {
      professor_id: professor?.id,
      student_id: user.studentId,
      start_time: consultationRequest.startTime,
      end_time: consultationRequest.endTime,
      status: "pending",
      type: consultationRequest.type,
      note: consultationRequest.note,
      date: localDateStr,
    };
    console.log("request data", data);
    return this.http.post('consultation-requests', data).pipe(map((res: {data: any}) => {
      return {
        consultationRequest: new ConsultationRequest(res.data),
      };
    }));
  }

  getScheduledConsultations() {
    return this.http.get('consultation-requests/scheduled').pipe(map((res: {data: any[]}) => {
      let consultationRequests: ConsultationRequest[] = res.data.map(item => new ConsultationRequest(item));
      return {
        consultationRequests: consultationRequests,
      };
    }));
  }

  getScheduledConsultationsProfessor() {
    return this.http.get('professor/scheduled').pipe(map((res: {data: any[]}) => {
      let consultationRequests: ConsultationRequest[] = res.data.map(item => new ConsultationRequest(item));
      return {
        consultationRequests: consultationRequests,
      };
    }));
  }

  getSentRequests() {
    return this.http.get('consultation-requests/pending').pipe(map((res: {data: any[]}) => {
      let consultationRequests: ConsultationRequest[] = res.data.map(item => new ConsultationRequest(item));
      return {
        consultationRequests: consultationRequests,
      };
    }));
  }

  getSentRequestsProfessor() {
    return this.http.get('professor/pending').pipe(map((res: {data: any[]}) => {
      let consultationRequests: ConsultationRequest[] = res.data.map(item => new ConsultationRequest(item));
      return {
        consultationRequests: consultationRequests,
      };
    }));
  }

  getEvents(){
    return this.http.get('google-calendar/events').pipe(map((res: {data: any[]}) => {
      return {
        events: res.data,
      }
    }));
  }

  addEvent(){
    return this.http.post('google-calendar/events', event).pipe(map((res: {data: any}) => {
      return {
        event: res.data,
      }
    }));
  }

  acceptConsultationRequest(consultationRequest: ConsultationRequest){
    let data = {
      title: "Konzultacije: "+ consultationRequest.professor?.user?.lastName + " - " + consultationRequest.student?.user?.lastName,
      consultation: consultationRequest,
    };
    console.log("event data", data);
    return this.http.put('consultation-requests/'+consultationRequest.id+'/accept',  data).pipe(map((res: {data: any}) => {
      return {
        consultationRequest: new ConsultationRequest(res.data),
      }
    }));
  }

  rejectConsultationRequest(consultationRequest: ConsultationRequest){
    let data = {
      consultation: consultationRequest,
    };
    return this.http.put('consultation-requests/'+consultationRequest.id+'/reject', data).pipe(map((res: {data: any}) => {
      return {
        consultationRequest: new ConsultationRequest(res.data),
      }
    }));
  }
}