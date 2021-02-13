import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  //------------api for getting search ------------------------------
  getSearchProduct(val:any,searchType:any) {
    return this.http.get<any>(this._url + 'home/search?in=' + searchType + '&val=' + val).pipe(map((res: any) => {
      return res;
    }));
  }
  getSearchProductWithFilters(val:any,searchType:any,httpparams:HttpParams) {
    return this.http.get<any>(this._url + 'home/search',{params:httpparams}).pipe(map((res: any) => {
      return res;
    }));
  }
  saveIndent(data): Observable<any> {
    let headers = {}
    
    return this.http.post(this._url + 'enquiry/insert', data,{responseType: 'text'}).pipe(map((res: any) => {
      console.log("indent received"+res);
      return res;
      
    }));
  }
}
