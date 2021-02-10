import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  _url: string;
  guideLineList: BehaviorSubject<any> = new BehaviorSubject([]);
  schemeList: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  getCrops(): Observable<any> {

    return this.http.get<any>(this._url + '').pipe(map((res: any) => {
      return res;
    }));
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
    return this.http.get<any>(this._url + 'complaint').pipe(map((res: any) => {
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
    return this.http.post<any>(this._url + 'circulars', data).pipe(map((res: any) => {
      return res;
    }));
  }
  updateCircular(data, formVlaue) {
    return this.http.put<any>(this._url + 'circulars/' + formVlaue.id, data).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllCircluarUpload() {
    return this.http.get<any>(this._url + 'circulars/getall').pipe(map((res: any) => {
      return res;
    }));
  }
  deleteCircular(data) {
    return this.http.delete<any>(this._url + 'circulars/' + data).pipe(map((res: any) => {
      return res;
    }));
  }
  getGuideline() {
    this.http.get<any>(this._url + 'fpoguidelines/getall').subscribe((res: any) => {
      if (res) {
        this.guideLineList.next(res);
      }
    })
  }
  uploadGuideline(data) {
    this.http.post<any>(this._url + 'fpoguidelines', { ...data }).subscribe((res: any) => {
      if (res) {
        this.getGuideline();
      }
    })
  }
  getScheme() {
    this.http.get<any>(this._url + 'schemes').subscribe((res: any) => {
      if (res) {
        this.schemeList.next(res);
      }
    })
  }
  uploadSchemes(data) {
    this.http.post<any>(this._url + 'schemes', { ...data }).subscribe((res: any) => {
      if (res) {
        this.getScheme();
      }
    })
  }
}

