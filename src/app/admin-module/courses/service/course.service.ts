import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Course } from 'src/app/models/course';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { CoursesTableFilter } from '../courses-table/courses-table.component';
import { SortDirection } from '@angular/material/sort';
import { Professor } from 'src/app/models/professor';
import { Student } from 'src/app/models/student';
import { CourseStudent } from 'src/app/models/courseStudent';
import { AdminHttpWrapperService } from 'src/app/services/admin-http-wrapper/admin-http-wrapper.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoggedInUserService } from 'src/app/services/logged-in-user/logged-in-user.service';
import { LocalStorageWrapperService } from 'src/app/services/local-storage-wrapper/local-storage-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiToken: string = '';
  constructor(
    private http: AdminHttpWrapperService,
    private httpClient: HttpClient,
    private httpWrapper: HttpWrapperService,
    private localStorage: LocalStorageWrapperService,
  ) { 
    
     this.apiToken = this.localStorage.get('api_token');
  }


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
  getCourse(id: number) {
    return this.http.get('courses/' + id).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }));
  }
  createCourse(course: Course) {
    let params = {
      name: course.name,
    };
    return this.http.post('courses', params).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }));
  }
  updateCourse(course: Course) {
    let params = {
      name: course.name,
    };
    return this.http.put('courses/' + course.id, params).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }));
  }
  deleteCourse(course: Course) {
    return this.http.delete('courses/' + course.id).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }
    ));
  }

  getProfessors() {
    return this.http.get('professors').pipe(map((res: { data: any[]}) => {
      let professors: Professor[] = res.data.map(professor => new Professor(professor));
      return {
        professors: professors,
      }
    }));
  }

  addProfessorToCourse(courseId: number, professorId: number) {
    return this.http.post('courses/' + courseId + '/add-professor/' + professorId, {}).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }));
  }

  removeProfessorFromCourse(courseId: number, professorId: number) {
    return this.http.delete('courses/' + courseId + '/remove-professor/' + professorId).pipe(map((res: any) => {
      return {
        course: new Course(res.data),
      }
    }));
  }
  
  getCoursesByStudent(student: Student,
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
      jmbag: student.jmbag,
      sort_by: data.sortBy,
      sort_direction: data.sortDirection,
    };

    return this.httpWrapper.get('student/'+student.id+'/courses', {params: params}).pipe(map((res: {data: any[], meta: MetaPagination}) => {
      let courses: CourseStudent[] = res.data.map(courseStudent => new CourseStudent(courseStudent));
      return {
        coursesStudent: courses,
        meta: res.meta,
      };
    }));
  }
}
