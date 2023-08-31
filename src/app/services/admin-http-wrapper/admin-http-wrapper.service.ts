import { LocalStorageWrapperService } from '../local-storage-wrapper/local-storage-wrapper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AdminHttpWrapperService {
  apiUrl = "http://127.0.0.1:8000/admin/";
  headers!: {
    headers: HttpHeaders;
  };

  constructor(
    public http: HttpClient,
    public errorHandler: ErrorHandlerService,
  ) {}

  setApiToken(apiToken: string) {
    this.headers = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + apiToken
      })
    };
  }

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
