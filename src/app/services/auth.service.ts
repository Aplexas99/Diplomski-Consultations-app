import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8000/oauth/token';
  apiUrl = 'http://localhost:8000/api';
  options: any;

  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  login(e: string, p: string) {
    return this.http.post(this.apiUrl+'/login', {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'eHLCmDDX1M6U544lUBt2tEVDj7QNwfoMIz79f2pj',
      email: e,
      password: p,
      scope: ''
    }, this.options);
  }
  /**
   * Revoke the authenticated user token
   */
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post('http://localhost:8000/api/logout', {allDevice: false}, {headers: headers});
  }
}
