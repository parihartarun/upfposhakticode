import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  getAllUser() {
    return this.http.get<any>(this._url + 'api/department/getAlluser').pipe(map((res: any) => {
      return res;
    }));
  }
  updateUser(user) {
    return this.http.put<any>(this._url + 'api/department/deactivateUser', user).pipe(map((res: any) => {
      return res;
    }));
  }
  deleteUser(userId) {
    return this.http.delete<any>(this._url + '' + userId ).pipe(map((res: any) => {
      return res;
    }));
  }

  deactivategetReason() {
    return this.http.get<any>(this._url + 'api/department/getAllReasons').pipe(map((res: any) => {
      return res;
    }));
  }

  updateActiveUser(user) {
    return this.http.put<any>(this._url + 'api/department/activateUser', user).pipe(map((res: any) => {
      return res;
    }));
  }

}
