import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChcFmbService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
 
  addCHCComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/chcfmb', data).pipe(map((res: any) => {
      return res;
    }));
  }
  getCHCComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/chcfmb/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

}
