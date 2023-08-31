import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { HttpWrapperService } from '../http-wrapper/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  // we do not want every component and service to be able to set the user
  private _user?: User;
  public get user(): User | undefined {
    return this._user;
  }

  constructor(
    private http: HttpWrapperService,
  ) {}

  clearUserDetails() {
    this._user = undefined;
  }

  details(): Observable<User> {
    if(this._user) {
      return of(this._user);
    }
    return this.http
    .get('user-details')
    .pipe(map((result: {
      data: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        role: Role,
      }
    }): User => {
      this._user = new User(result.data);
      return this._user!;
    }));
  }
}