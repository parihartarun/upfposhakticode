import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerSellerService {
 
    _url: string;
    constructor(private http: HttpClient) { 
      this._url = environment.baseUrl;
    }

    editbuyer(id, data){
    return  this.http.put<any>(this._url+`buyer-seller-controller/editBuyerSeller/`+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }

}