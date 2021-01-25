import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageUnitService {
  _url: string;
  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }


//======================== apis added by kaustubh =====================================
getFpoProfileByUsername(username)
{
  return  this.http.get<any>(this._url+`api/fpos/getByUsername/${username}`).pipe(map((res:any)=>{
    return res;
  }));
}

getBlocksById(id:any)
{
  return  this.http.get<any>(this._url+`api/v1/block/getBlocksByDistrictId/${id}`).pipe(map((res:any)=>{
    return res;
  }));
}
//------------api for getting equipment list ------------------------------
getDistricts(){
  return  this.http.get<any>(this._url+'api/equipments').pipe(map((res:any)=>{
    return res;
  }));
}
getDistrictsByStateId(){
  return  this.http.get<any>(this._url+`api/v1/District/getDistricts`).pipe(map((res:any)=>{
    return res;
  }));
}
getBlocksByDistrictsId(){
  return  this.http.get<any>(this._url+'api/equipments').pipe(map((res:any)=>{
    return res;
  }));
}
getStorageUnits(){
  return  this.http.get<any>(this._url+'api/collectioncenters').pipe(map((res:any)=>{
    return res;
  }));
}
updateStrotageUnit(data,id){
   let header = new HttpHeaders()
   header.append('contentType',"application/json")
  return  this.http.put<any>(this._url+`api/collectioncenters/:`+id,data,{headers:header}).pipe(map((res:any)=>{
    return res;
  }));
}
deleteStrotageUnit(id:number){
  return  this.http.delete<any>(this._url+`api/collectioncenters/${id}`).pipe(map((res:any)=>{
    return res;
  }));
}
addStrotageUnit(data){
  let header = new HttpHeaders()
   header.append('contentType',"application/json")
  return  this.http.post<any>(this._url+'api/collectioncenters',data,{headers:header}).pipe(map((res:any)=>{
    return res;
  }));
}

getDsitrictById(id){
  return  this.http.get<any>(this._url+`api/v1/District/getDistricts/${id}`).pipe(map((res:any)=>{
    return res;
  }));
}

}
