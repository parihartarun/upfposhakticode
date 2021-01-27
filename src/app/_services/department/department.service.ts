import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  /************************** department's  Complaints/ Suggestions **********************************/
  getComplaints_Suggestions() {
    return this.http.get<any>(this._url + '').pipe(map((res: any) => {
      return res;
    }));
  }
  uopladFile(file: any) {
    return this.http.post<any>(this._url + '', file).pipe(map((res: any) => {
      return res;
    }));
  }
  getComplaints() {
    return this.http.get<any>(this._url + '').pipe(map((res: any) => {
      return res;
    }));
  }
  updateStatus(data) {
    return this.http.post<any>(this._url + '', data).pipe(map((res: any) => {
      return res;
    }));
  }
  deleteCompliant(data) {
    return this.http.delete<any>(this._url + '', data).pipe(map((res: any) => {
      return res;
    }));
  }
  updateComplaint(data) {
    return this.http.put<any>(this._url + '' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }
  /**************************Upload Circule***********************/
  addUploadCircular(data) {
    return this.http.post<any>(this._url + '' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }
}

