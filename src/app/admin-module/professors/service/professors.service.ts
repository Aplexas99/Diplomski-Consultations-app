import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { map } from 'rxjs';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { Professor } from 'src/app/models/professor';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { ProfessorsTableFilter } from '../professors-table/professors-table.component';
import { Course } from 'src/app/models/course';
@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  getProfessors(    
    data: {
    filter: ProfessorsTableFilter,
    perPage: number,
    pageIndex: number,
    sortBy: string,
    sortDirection: SortDirection,
}) {
  let params = {
    per_page: data.perPage,
    page: data.pageIndex,
    name: data.filter.name,
    last_name: data.filter.lastName,
    email: data.filter.email,
    sort_by: data.sortBy,
    sort_direction: data.sortDirection,
  };
    return this.http.get('professors', {params: params}).pipe(map((res: {data: any[], meta: MetaPagination}) => {
      let professors: Professor[] = res.data.map(item => new Professor(item));
      return {
        professors: professors,
        meta: res.meta,
      };
    }));
  }

  getProfessor(id: number) {
    return this.http.get('professors/' + id).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }));
  }
  
  createProfessor(id: number) {
    let params = {
      user_id: id,
    };
    return this.http.post('professors', params).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }));
  }

  updateProfessor( professor: Professor) {
    let params = {
      name: professor.user!.name,
      last_name: professor.user!.lastName,
      email: professor.user!.email,
    };
    return this.http.put('professors/' + professor.id, params).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }));
  }

  deleteProfessor(professor: Professor) {
    return this.http.delete('professors/' + professor.id).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }));
  }

  addCourseToProfessor(professorId: number, courseId: number) {
    let params = {
      course_id: courseId,
    };
    return this.http.post('professors/' + professorId + '/add-course/'+courseId, params).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }));
  }

  deleteCourseFromProfessor(professorId: number, courseId: number) {
    let params = {
      course_id: courseId,
    };
    return this.http.post('professors/' + professorId + '/remove-course/'+courseId, params).pipe(map((res: any) => {
      return {
        professor: new Professor(res.data),
      }
    }
    ));
  }

  getCourses(){
    return this.http.get('courses').pipe(map((res: {data: any[], meta: MetaPagination}) => {
      let courses: Course[]  = res.data.map(item => new Course(item));
      return {
        courses: courses,
      }
    }
    ));
  }
}
