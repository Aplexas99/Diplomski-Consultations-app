import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { StudentsTableFilter } from '../students-table/students-table.component';
import { SortDirection } from '@angular/material/sort';
import { map } from 'rxjs';
import { Student } from 'src/app/models/student';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { Course } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private http: HttpWrapperService,
  ) { }

  getStudents(
      data: {
        filter: StudentsTableFilter,
        perPage: number,
        pageIndex: number,
        sortBy: string,
        sortDirection: SortDirection,
    }) {
      let params = {
        per_page: data.perPage,
        page: data.pageIndex,
        name: data.filter.name,
        jmbag: data.filter.jmbag,
        sort_by: data.sortBy,
        sort_direction: data.sortDirection,
      };
        return this.http.get('students', {params: params}).pipe(map((res: {data: any[], meta: MetaPagination}) => {
          let students: Student[] = res.data.map(student => new Student(student));
          return {
            students: students,
            meta: res.meta,
          };
        }));
    }

    createStudent(student: Student) {
      let params = {
        id: student.id,
        user_id: student.user!.id,
        jmbag: student.jmbag,
      };
      return this.http.post('students', params).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }

    updateStudent(student: Student) {
      let params = {
        jmbag: student.jmbag,
        user_id: student.user!.id,
      }
      return this.http.put('students/' + student.id, params).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }

    deleteStudent(student: Student) {
      return this.http.delete('students/' + student.id).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }

    getStudent(id: number) {
      return this.http.get('students/' + id).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }

    removeCourseFromStudent(student: Student, course: Course) {
      return this.http.delete('students/' + student.id + '/remove-course/' + course.id).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }

    addCourseToStudent(student: Student, course: Course) {
      return this.http.post('students/' + student.id + '/add-course/' + course.id, {}).pipe(map((res: any) => {
        return {
          student: new Student(res.data),
        }
      }));
    }
  }