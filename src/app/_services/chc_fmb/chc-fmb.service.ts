import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChcFmbService {

  _url: string;
  equipmentTypes: BehaviorSubject<any> = new BehaviorSubject([]);
  equipmentName: BehaviorSubject<any> = new BehaviorSubject([]);
  machineryList: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  getDashboardData(id) {
    return this.http.get<any>(this._url + `chcFmbDashboard/barChart/`+id).pipe(map((res: any) => {
      return res;
    }));
  }

  getUserDetails(id) {
    return this.http.get<any>(this._url + `profile/ChcFmbDetail/`+id).pipe(map((res: any) => {
      return res;
    }));
  }

  getIndentDetails(id) {
    return this.http.get<any>(this._url + `chcFmbDashboard/indent/`+id).pipe(map((res: any) => {
      return res;
    }));
  }

  addCHCComplaint(complaint: any, data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint/chcfmb', data).pipe(map((res: any) => {
      return res;
    }));
  }
  getCHCComplaints(masterId) {
    return this.http.get<any>(this._url + 'fpocomplaint/chcfmb/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }
  getequipmenttypes() {
    this.http.get<any>(this._url + 'chcfmb/machinery/equipmenttype/getall').subscribe((res: any) => {
      if (res) {
        this.equipmentTypes.next(res);
      }
    })
  }

  getequipmentname(masterId) {
    this.http.get<any>(this._url + 'chcfmb/machinery/equipmentname/' + masterId).subscribe((res: any) => {
      this.equipmentName.next(res);
    })
  }
  addchcfmbMachinery(params) {
    return this.http.post<any>(this._url + 'chcfmb/machinery', params);
  }
  updatechcfmbMachinery(id, params) {
    return this.http.put<any>(this._url + 'chcfmb/machinery/' + id, params);
  }
  getAllMachinery(masterId) {
    this.http.get<any>(this._url + 'chcfmb/machinery/getall/' + masterId).subscribe((res: any) => {
      if (res) {
        this.machineryList.next(res);
      }
    })
  }
  deleteMachinery(id) {
    return this.http.delete<any>(this._url + 'chcfmb/machinery/' + id);
  }
  getMachinaries(masterId) {
    this.http.get<any>(this._url + 'chcfmb/machinery/getall/' + masterId).subscribe((res: any) => {
      return res;
    })
  }
}
