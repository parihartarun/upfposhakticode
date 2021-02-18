import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BuyerSellerService {
 
    _url: string;
    constructor(private http: HttpClient) { 
      this._url = environment.baseUrl;
    }

    editbuyer(id,data){
    return  this.http.put<any>(this._url+`api/v1/BuyerSeller/editBuyerSeller/`+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }


  getbyid(id)
  {
    return  this.http.get<any>(this._url+`api/v1/BuyerSeller/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }

}