import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class RepoService {
  private API_URL = environment.apiURL;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getLastSevenDays(): Observable<any> {
    return this.http.get(this.API_URL + '/rest/sales/last_seven_days').map(res => res.json());
  }
  getToday(): Observable<any> {
    return this.http.get(this.API_URL + '/rest/sales/today').map(res => res.json());
  }

}
