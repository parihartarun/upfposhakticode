import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }
  getAllUser() {
    return this.http.get<any>('').pipe(map((res: any) => {
      return res;
    }));
  }
}
