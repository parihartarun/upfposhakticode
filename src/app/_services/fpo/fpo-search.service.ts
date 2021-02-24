import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FpoSearchService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getDistrictBystateId(keyword, type) {
    this.http.get<any>(this._url + `api/search/filters/districts?in=${type}&val=${keyword}`).subscribe((res: any) => {
      console.log('district list', res);

    })
  }
}
