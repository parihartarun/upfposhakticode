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
 
}
