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
  cropsObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  filteredObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  brandsObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  machineryTypesObserver: BehaviorSubject<any> = new BehaviorSubject([]);
  inputSupplierObserver:BehaviorSubject<any> = new BehaviorSubject([]);
  fertilizerTypesObserver:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  searchData(params) {
    // this.http.post<any>(this._url + 'home/search', { ...params }).subscribe((res: any) => {
    //   console.log('filter data', res);
    //   this.filteredObserver.next(res);
    // })
    this.http.put<any>(this._url + 'home/search', { ...params }).subscribe((res: any) => {
      console.log('filter data', res);
      this.filteredObserver.next(res);
    })
  }
  getDistrict(keyword, type) {
    this.http.get<any>(this._url + `api/search/v2/filters/districts?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.districtObserver.next(res);
    })
  }
  getFpo(keyword, type) {
    this.http.get<any>(this._url + `api/search/v2/filters/fpos?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.fpoObserver.next(res);
    })
  }
  getCrops(keyword, type) {
    this.http.get<any>(this._url + `api/search/v2/filters/crops?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.cropsObserver.next(res);
    })
  }

  getMachineryTypes(keyword,type){
    this.http.get<any>(this._url + `api/search/v2/filters/machinerytypes?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.machineryTypesObserver.next(res);
    })
  }  

  getBrands(keyword,type){
    this.http.get<any>(this._url + `api/search/v2/filters/brands?in=${type}&val=${keyword}`).subscribe((res: any) => {
      this.brandsObserver.next(res);
    })
  }

  getInputSuppliers(keyword,type){
    this.http.get<any>(this._url +`api/search/v2/filters/inputSuppliers?in=${type}&val=${keyword}`).subscribe((res:any)=>{
      this.inputSupplierObserver.next(res);
    })
  }

  getFertilizerTypes(keyword,type){
    this.http.get<any>(this._url +`api/search/v2/filters/fertilizertypes?in=${type}&val=${keyword}`).subscribe((res:any)=>{
      this.fertilizerTypesObserver.next(res);
    })
  }

}
