import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
