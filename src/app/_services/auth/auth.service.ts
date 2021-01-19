import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';
import { Observable } from 'rxjs';

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
   
    return this.http.post<any>(this._url + 'register/farmer', data).pipe(map((res: any) => {
      return res;
    }));
  }
  getDistrict(): Observable<any>  {
   
    return this.http.get<any>(this._url + 'api/v1/District/getDistricts' ).pipe(map((res: any) => {
      return res;
    }));
  }
  getBank(): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/Bank/getBanks').pipe(map((res: any) => {
      return res;
    }));
  }
  getBlock(distId: number) {
  
    return this.http.get<any>(this._url + 'api/v1/block/getBlocksByDistrictId/'+distId).pipe(map((res: any) => {
      return res;
    }));
  }
  getGramPanchayat(blockId: number) {

    return this.http.get<any>(this._url + 'api/v1/panchayats/getPanchayatsByBlockId/'+blockId).pipe(map((res: any) => {
      return res;
    }));
  }
  getVillage(panchayatId: number) {
   
    return this.http.get<any>(this._url + 'api/v1/villages/getVillagesByPanchayatId/'+panchayatId).pipe(map((res: any) => {
      return res;
    }));
  }
  registerFPO(data) {

    return this.http.post<any>(this._url + 'register/fpo', data).pipe(map((res: any) => {
      return res;
    }));
  }
  registerInputSupplier(data) {

    return this.http.post<any>(this._url + 'register/inputSupplier', data).pipe(map((res: any) => {
      return res;
    }));
  }
  registerBuyerSeller(data) {

    return this.http.post<any>(this._url + 'register/buyerSeller', data).pipe(map((res: any) => {
      return res;
    }));
  }
}
