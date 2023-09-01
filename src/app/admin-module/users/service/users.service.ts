import { Injectable } from '@angular/core';
import { HttpWrapperService } from 'src/app/services/http-wrapper/http-wrapper.service';
import { UsersTableFilter } from '../users-table/users-table.component';
import { SortDirection } from '@angular/material/sort';
import { map } from 'rxjs';
import { MetaPagination } from 'src/app/models/meta-pagination';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { AdminHttpWrapperService } from 'src/app/services/admin-http-wrapper/admin-http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: AdminHttpWrapperService,
  ) { }

  getUsers(    
    data: {
    filter: UsersTableFilter,
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
    role: data.filter.role,
    sort_by: data.sortBy,
    sort_direction: data.sortDirection,
  };
    return this.http.get('users', {params: params}).pipe(map((res: {data: any[], meta: MetaPagination}) => {
      let users: User[] = res.data.map(item => new User(item));
      return {
        users: users,
        meta: res.meta,
      };
    }));
  }
  
  createUser(user: User) {
    let params = {
      name: user.name,
      last_name: user.lastName,
      email: user.email,
      role_id: user.role?.id,
    };
    return this.http.post('users', params).pipe(map((res: any) => {
      return {
        user: new User(res.data),
      }
    }));
  }

  updateUser(user: User, password?: string) {
    let params = {
      name: user.name,
      last_name: user.lastName,
      email: user.email,
      role_id: user.role!.id,
      password: password,
    };
    return this.http.put('users/' + user.id, params).pipe(map((res: any) => {
      return {
        user: new User(res.data),
      }
    }));
  }

  deleteUser(user: User) {
    return this.http.delete('users/' + user.id).pipe(map((res: any) => {
      return {
        user: new User(res.data),
      }
    }));
  }

  getRoles() {
    return this.http.get('roles').pipe(map((res: any) => {
      let roles: Role[] = res.data.map((item: any) => new Role(item));
      return {
        roles: roles,
      }
    }));
  }
}
