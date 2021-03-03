import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  _url: string;

  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }

  getFarmerDetailList(masterId) {
    return this.http.get<any>(this._url + 'api/Farmer/getFarmerDetails/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  getSeasonList() {
    return this.http.get<any>(this._url + 'api/v1/seasonMaster/getSeasons').pipe(map((res: any) => {
      return res;
    }));
  }


  getCropsBySeasonId(seasonId) {
    return this.http.get<any>(this._url + 'api/v1/cropMasterDetails/getCropsBySeasonId/' + seasonId).pipe(map((res: any) => {
      return res;
    }));
  }
  
  getCropList() {
    return this.http.get<any>(this._url + 'api/v1/cropMasterDetails/getCropDetails').pipe(map((res: any) => {
      return res;
    }));
  }

  getCropVarietiesByCropId(cropId) {
    return this.http.get<any>(this._url + 'api/v1/cropVarietyDetails/getCropVarietiesByCropId/' + cropId).pipe(map((res: any) => {
      return res;
    }));
  }

  getMarkatableQuantityMeasurements(){
    return this.http.get<any>(this._url + 'api/Farmer/getFarmerDetails/').pipe(map((res: any) => {
      return res;
    }));
  }

  getFinancialYears(){
    return this.http.get<any>(this._url + 'fpoDashboard/getFinancialYears').pipe(map((res: any) => {
      return res;
    }));
  }

}
