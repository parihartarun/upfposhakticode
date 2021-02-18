import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  getFarmers(): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/Farmer/getFarmerDetails').pipe(map((res: any) => {
      return res;
    }));
  }
  getFarmersDetils(farmerId: number): Observable<any> {

    return this.http.get<any>(this._url + '' + farmerId).pipe(map((res: any) => {
      return res;
    }));

  }
  getFarmerProfileByUsername(materId) {
    return this.http.get<any>(this._url + `api/farmer/profile/${materId}`).pipe(map((res: any) => {
      return res;
    }));
  }
  updateProfile(data) {
    return this.http.put<any>(this._url + `api/farmer/update/${data.farmerId}`, data).pipe(map((res: any) => {
      return res;
    }));
  }
  getFarmerLandDetailList(id) {
    return this.http.get<any>(this._url + 'landdetail/getall/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getFarmernotification(id,isread) {
    return this.http.get<any>(this._url + 'notification/fponotification/' + id+"/"+isread).pipe(map((res: any) => {
      return res;
    }));
  }

  addLandDetails(data: any) {
    return this.http.post<any>(this._url + 'landdetail/land', data).pipe(map((res: any) => {
      return res;
    }));
  }

  deletelandDetailById(id: number) {
    return this.http.delete<any>(this._url + 'landdetail/land/deleteDetails/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  updateLandDetail(data: any) {
    return this.http.put<any>(this._url + 'landdetail/land/editDetails/' + data.landId, data).pipe(map((res: any) => {
      return res;
    }));
  }
  getComplaints(masterId) {
    return this.http.get<any>(this._url + 'complaint/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  getCHCComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/chcfmb/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  getInputComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/inputsupplier/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  addComplaint(complaint:any,data: any) {
    return this.http.post<any>(this._url + 'complaint', data).pipe(map((res: any) => {
      return res;
    }));
  }
  addCHCComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/chcfmb', data).pipe(map((res: any) => {
      return res;
    }));
  }
  addInputComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/inputsupplier', data).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllNotificationByFpo(id) {

    return this.http.get<any>(this._url + 'notification/farmernotification/' + id).pipe(map((res: any) => {
      return res;
    }));
  }


  updateNotification(id) {
    return this.http.put<any>(this._url + `notification/`,id).pipe(map((res: any) => {
      return res;
    }));
  }

}
