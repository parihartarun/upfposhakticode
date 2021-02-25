import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InputSupplierService {
 
    _url: string;
    constructor(private http: HttpClient) { 
      this._url = environment.baseUrl;
    }

    editinputsupplier(data,id){
    return  this.http.put<any>(this._url+`api/v1/InputSupplier/editInputSupplier/`+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }


  getbyid(id)
  {
    return  this.http.get<any>(this._url+`api/v1/InputSupplier/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }



  // ----------------------------Seeds-------------------------------------------------


  getallseeds(){
    return  this.http.get<any>(this._url+'inputsupplier/seed/getall').pipe(map((res:any)=>{
          return res;
        }));
  }

  uploadFile(file: any) {
    return this.http.post<any>(this._url + 'inputsupplier/seed/download/', file).pipe(map((res: any) => {
      return res;
    }));
  }

  addseed(data: any) {
    return this.http.post<any>(this._url + 'fposeed', data).pipe(map((res: any) => {
      return res;
    }));
  }
 
  updateseed(data, formdata) {
    return this.http.put<any>(this._url + 'inputsupplier/seed/' + data.id, formdata).pipe(map((res: any) => {

      return res;
    }));
  }


  deleteseed(data) {
    return this.http.delete<any>(this._url + 'inputsupplier/seed/' + data).pipe(map((res: any) => {
      return res;
    }));
  }

  getInputComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/inputsupplier/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  addInputComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/inputsupplier', data).pipe(map((res: any) => {
      return res;
    }));
  }
}
