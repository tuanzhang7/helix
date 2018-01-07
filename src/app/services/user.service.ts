import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class UserService {
  private API_URL = environment.apiURL;
  // private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private headers = new Headers({ 'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  register(user): Observable<any> {
    return this.http.post(this.API_URL + '/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post(this.API_URL + '/auth/local', JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.API_URL + '/api/users').map(res => res.json());
  }

  countUsers(): Observable<any> {
    return this.http.get(this.API_URL + '/api/users/count').map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http.post(this.API_URL + '/api/user', JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(this.API_URL + `/api/user/${user._id}`).map(res => res.json());
  }

  editUser(user): Observable<any> {
    return this.http.put(this.API_URL + `/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(this.API_URL + `/api/user/${user._id}`, this.options);
  }

}
