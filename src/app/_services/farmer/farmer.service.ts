import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
/************************** farmer **********************************/
  addFarmer(data): Observable<any> {

    return this.http.post<any>(this._url + '', data).pipe(map((res: any) => {
      return res;
    }));
  }
}
