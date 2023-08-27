import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  apiUrl = 'http://localhost:8000/api/';
  headers!: {
    headers: HttpHeaders;
  };
  
  constructor(
    public http: HttpClient,
    public errorHandler: ErrorHandlerService,
  ) { }
  
getRaw(url: string, headers?: HttpHeaders | {
    [header: string]: string | string[];
}): Observable<any> {
  return this.http.get(url, { ...new HttpHeaders(), ...headers }).pipe(catchError(this.errorHandler.handleError));
}

get(url: string, headers?: any): Observable<any> {
  return this.http.get(this.apiUrl + url, { ...this.headers, ...headers }).pipe(catchError(this.errorHandler.handleError));
}

post(url: string, data: any = null): Observable<any> {
  return this.http.post(this.apiUrl + url, data, this.headers);
}

put(url: string, data: any = null): Observable<any> {
  return this.http.put(this.apiUrl + url, data, this.headers);
}

patch(url: string, data: any = null): Observable<any> {
  return this.http.patch(this.apiUrl + url, data, this.headers);
}

delete(url: string): Observable<any> {
  return this.http.delete(this.apiUrl + url, this.headers);
}
  
}
