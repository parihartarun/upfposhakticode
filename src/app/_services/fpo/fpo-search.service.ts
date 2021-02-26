import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FpoSearchService {

  _url: string;
  districtObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  fpoObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  cropsObserver: Subject<any> = new Subject();
  filteredObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  searchData(params) {
    this.http.post<any>(this._url + 'home/search', { ...params }).subscribe((res: any) => {
      console.log('filter data', res);
      this.filteredObserver.next(res);
    })
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
      this.cropsObserver.next(res);
    })
  }
}
