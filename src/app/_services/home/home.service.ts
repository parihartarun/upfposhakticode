import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


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
    return this.http.get<any>(this._url + 'home/farmer').pipe(map((res: any) => {
      return res;
    }));
  }
  getProductionDetails() {
    let date = new Date()
    let year = date.getFullYear()
    return this.http.get<any>(this._url + 'home/production?finYear=' + year).pipe(map((res: any) => {
      return res;
    }));
  }
  getChcFmbs() {
    return this.http.get<any>(this._url + 'home/fmbs').pipe(map((res: any) => {
      return res;
    }));
  }
  getColdStorages() {
    return this.http.get<any>(this._url + 'home/coldStorages').pipe(map((res: any) => {
      return res;
    }));
  }
  getSeedProcessingUnits() {
    return this.http.get<any>(this._url + 'home/seedProcessing').pipe(map((res: any) => {
      return res;
    }));
  }
 
}
