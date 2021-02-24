import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FpoSearchService {

  _url: string;
  districtObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  fpoObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getDistrict(keyword, type) {
    this.http.get<any>(this._url + `api/search/filters/districts?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.districtObserver.next(res);
    })
  }
  getFpo(keyword, type) {
    this.http.get<any>(this._url + `api/search/filters/fpos?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.fpoObserver.next(res);
    })
  }
  getCrops(keyword, type) {
    this.http.get<any>(this._url + `api/search/filters/crops?in=${type}&val=${keyword}`).subscribe((res: any) => {
      // this.fpoObserver.next(res);
      console.log('all crops', res);

    })
  }
}
