import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

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

}