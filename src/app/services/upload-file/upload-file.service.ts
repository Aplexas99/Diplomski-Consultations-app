import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpWrapperService } from '../http-wrapper/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  upload(files: any[], endpoint: string) {
    if(files.length == 0) {
      return of([]);
    }

    let requests: Observable<{ id?: number, file: string }>[] = [];
    files.forEach(file => {
      let formData = new FormData();
      formData.append("file", file.file);

      let request = this.http.post(endpoint, formData).pipe(map((result: { data: { id?: number, file: string }}) => {
        return result.data;
      }));
      requests.push(request);
    });

    return forkJoin(requests);
  }
}
