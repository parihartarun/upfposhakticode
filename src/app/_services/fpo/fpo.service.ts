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

  /************************** License **********************************/
  getLicense(){
    return  this.http.get<any>(this._url+'api/fpo/license').pipe(map((res:any)=>{
      return res;
    }));
  }

  getLicenseTypes(){
    return  this.http.get<any>(this._url+'api/licenses').pipe(map((res:any)=>{
      return res;
    }));
  }

  addLicense(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateLicense(data){
    return  this.http.put<any>(this._url+'api/fpo/licenses/updateLicense/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteLicense(id){
    return  this.http.delete<any>(this._url+'api/fpo/licenses/deleteLicense/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  /************************** Machinary banks **********************************/
  getMachinaryBanks(){
    return  this.http.get<any>(this._url+'api/farm/machinery/banks').pipe(map((res:any)=>{
      return res;
    }));
  }

  getEquipments(){
    return  this.http.get<any>(this._url+'api/equipments').pipe(map((res:any)=>{
      return res;
    }));
  }

  addMachinaryBank(data){
    return  this.http.post<any>(this._url+'api/farm/machinery/banks', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateMachinaryBank(data){
    return  this.http.put<any>(this._url+'api/farm/machinery/banks/updateMachinery/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteMachinaryBank(id){
    return  this.http.delete<any>(this._url+'api/farm/machinery/banks/deleteMachinery/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  /************************** FPO's Crop Production **********************************/
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

  /************************** FPO's Sales Details **********************************/
  getFpoSalesInfo(){
    return  this.http.get<any>(this._url+'api/fposalesdetails/getall').pipe(map((res:any)=>{
      return res;
    }));
  }

  addFpoSalesInfo(data){
    return  this.http.post<any>(this._url+'api/fposalesdetails/insert', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateFpoSalesInfo(data){
    return  this.http.put<any>(this._url+'api/fposalesdetails/update1/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteFpoSalesInfo(id){
    return  this.http.delete<any>(this._url+'api/fposalesdetails/delete1/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  
  getComplaints(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addComplaint(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getServices(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addService(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getPhotographs(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addPhotograph(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

}
