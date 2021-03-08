import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class schemaService {
 
    _url: string;
    constructor(private http: HttpClient) { 
      this._url = environment.baseUrl;
    }

  getDashboardData(type){
    return  this.http.get<any>(this._url+`schemes/`+type).pipe(map((res:any)=>{
      return res;
    }));
  }

}