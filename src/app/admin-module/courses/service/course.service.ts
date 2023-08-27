import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Course } from 'src/app/models/course';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { CoursesTableFilter } from '../courses-table/courses-table.component';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  getCourses(    
    data: {
    filter: CoursesTableFilter,
    perPage: number,
    pageIndex: number,
    sortBy: string,
    sortDirection: SortDirection,
}) {
  let params = {
    per_page: data.perPage,
    page: data.pageIndex,
    name: data.filter.name,
    sort_by: data.sortBy,
    sort_direction: data.sortDirection,
  };
    return this.http.get('courses', {params: params}).pipe(map((res: {data: any[], meta: MetaPagination}) => {
      let courses: Course[] = res.data.map(course => new Course(course));
      return {
        courses: courses,
        meta: res.meta,
      };
    }));
  }


}
