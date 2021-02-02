import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  //------------api for getting search ------------------------------
  getfarmerDetails() {
    return this.http.get<any>(this._url + '/home/farmer').pipe(map((res: any) => {
      return res;
    }));
  }
  getProductionDetails() {
    let date = new Date()
    let year = date.getFullYear()
    return this.http.get<any>(this._url + '/home/production?finYear=' + year).pipe(map((res: any) => {
      return res;
    }));
  }
 
}
