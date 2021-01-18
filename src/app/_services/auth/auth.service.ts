import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _url: string;
  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }

  userLogin(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }
  
  registerUser(data) {
    alert()
    return this.http.post<any>(this._url + 'register/farmer', data).pipe(map((res: any) => {
      return res;
    }));
  }
}
