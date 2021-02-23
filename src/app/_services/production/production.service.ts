import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  _url: string;
  cropSowingData: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }

  getFarmerCropSowingDetails(data) {
    return this.http.post<any>(this._url + 'fpoCropSowing/getFarmerCropSowingDetails/', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerDetailsForCropSowing(farmerId) {
    return this.http.get<any>(this._url + 'fpoCropSowing/getFarmerDetailsForCropSowing/'+farmerId).pipe(map((res: any) => {
      return res;
    }));
  }

  addFarmerCropSowingDetails(data){
    return this.http.post<any>(this._url + 'fpoCropSowing/addFarmerCropSowingDetails', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateFarmerCropSowingDetails(data){
    return this.http.put<any>(this._url + 'fpoCropSowing/updateFarmerCropSowingDetails/'+data.crop_id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteFarmerCropSowingDetails(cropId){
    return this.http.delete<any>(this._url + 'fpoCropSowing/deleteCropSowingDetails/'+cropId).pipe(map((res: any) => {
      return res;
    }));
  }
}
