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
//======================== apis added by kaustubh =====================================
//------------api for getting equipment list ------------------------------
getEquipList(){
  return  this.http.get<any>(this._url+'api/equipments').pipe(map((res:any)=>{
    return res;
  }));
}

getFarmerMachineryBankList(){
  return  this.http.get<any>(this._url+'signin').pipe(map((res:any)=>{
    return res;
  }));
}
addFarmerMachineryBank(data:any){
  return  this.http.get<any>(this._url+'signin').pipe(map((res:any)=>{
    return res;
  }));
}
deleteFarmerMachineryBankList(id:number){
  return  this.http.get<any>(this._url+'signin').pipe(map((res:any)=>{
    return res;
  }));
}
updateFarmerMachineryBankList(id:number,data:any){
  return  this.http.get<any>(this._url+'signin').pipe(map((res:any)=>{
    return res;
  }));
}
//=====================================================================================
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

  getFpoSalesInfo(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addFpoSalesInfo(data){
    return  this.http.post<any>(this._url+'signin', data).pipe(map((res:any)=>{
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
