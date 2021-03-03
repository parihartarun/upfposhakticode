import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _url: string;
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  userLogin(data) {
    return this.http.post<any>(this._url + 'signin', data).pipe(map((res: any) => {
      return res;
    }));
  }

  sendForgotPasswordEmail(data) {
    return this.http.post<any>(this._url + 'signin', data).pipe(map((res: any) => {
      return res;
    }));
  }


  registerUser(data): Observable<any> {

    return this.http.post<any>(this._url + 'register/farmer', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerDataFromUpAgriPardarshi(regNo){
    return this.http.get<any>(this._url + 'upagri/getUpAgri/'+regNo).pipe(map((res: any) => {
      return res;
    }));
  }

  getDistrict(): Observable<any> {
    return this.http.get<any>(this._url + 'api/v1/District/getDistricts').pipe(map((res: any) => {
      return res;
    }));
  }

  getDistrictBystateId(stateid: number): Observable<any> {
    return this.http.get<any>(this._url + `api/v1/District/getDistrictsByStateId/${stateid}`).pipe(map((res: any) => {
      return res;
    }));
  }
  getCrops(): Observable<any> {

    return this.http.get<any>(this._url + `api/v1/cropMasterDetails/getCropDetails`).pipe(map((res: any) => {
      return res;
    }));
  }
  getBank(): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/Bank/getBanks').pipe(map((res: any) => {
      return res;
    }));
  }
  getBlock(distId: number) {

    return this.http.get<any>(this._url + 'api/v1/block/getBlocksByDistrictId/' + distId).pipe(map((res: any) => {
      return res;
    }));
  }
  getGramPanchayat(blockId: number) {

    return this.http.get<any>(this._url + 'api/v1/panchayats/getPanchayatsByBlockId/' + blockId).pipe(map((res: any) => {
      return res;
    }));
  }
  getVillage(panchayatId: number) {

    return this.http.get<any>(this._url + 'api/v1/villages/getVillagesByPanchayatId/' + panchayatId).pipe(map((res: any) => {
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
  getState(): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/state/getStates').pipe(map((res: any) => {
      return res;
    }));
  }
  getDistrictByState(id: Number): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/District/getDistrictsByStateId/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getVillageByBlock(id: Number): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/villages/getVillagesByBlocktId/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  registerCHCFmb(data) {

    return this.http.post<any>(this._url + 'register/chcFmb', data).pipe(map((res: any) => {
      return res;
    }));
  }

  registerFarmerByFpo(data) {
    alert(JSON.stringify(data))
    return this.http.post<any>(this._url + 'register/fpo', data).pipe(map((res: any) => {
      return res;
    }));
  }
  getDeptmentUser() {
    return this.http.get<any>(this._url + 'api/v1/user/dept/1').pipe(map((res: any) => {
      return res;
    }));
  }
  getVariety(data): Observable<any> {
    return this.http.post<any>(this._url + `api/v1/cropVarietyDetails/getCropVarietyByMultipleCropId`, data).pipe(map((v: any) => {
      
      return v;
    }));
  
  }
  getSeed(): Observable<any> {

    return this.http.get<any>(this._url + 'api/v1/seedmaster/getSeeds').pipe(map((res: any) => {
      return res;
    }));
  }
  changePassword(data) {
    return this.http.post<any>(this._url + 'signin/password/reset', { ...data });
  }

}
