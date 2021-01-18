import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FpoService {
  _url: string;
  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }

  getBoardMembers(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addBoardMember(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getLicense(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addLicense(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getCropProduction(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addCropProduction(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getStorageUnits(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addStorageUnit(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

}
