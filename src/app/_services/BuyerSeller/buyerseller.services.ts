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

  getDashboardData(id) {
    return this.http.get<any>(this._url + `buyerSellerDashboard/getBuyerSellerDashboardData/`+id).pipe(map((res: any) => {
      return res;
    }));
  }

  getbyid(id)
  {
    return  this.http.get<any>(this._url+`api/v1/BuyerSeller/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }
  getBuyerComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/buyerseller' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  addBuyerComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/buyerseller', data).pipe(map((res: any) => {
      return res;
    }));
  }

}
