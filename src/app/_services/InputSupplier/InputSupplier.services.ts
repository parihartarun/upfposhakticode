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

    getDashboardData(id) {
      return this.http.get<any>(this._url + `inputSupplierDashboard/barChart/`+id).pipe(map((res: any) => {
        return res;
      }));
    }

    getIndentDetails(id) {
      return this.http.get<any>(this._url + `inputSupplierDashboard/indent/`+id).pipe(map((res: any) => {
        return res;
      }));
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


  getallseeds(masterId){
    return  this.http.get<any>(this._url+`inputsupplier/seed/getall/`+masterId).pipe(map((res:any)=>{
          return res;
        }));
  }

  uploadFile(file: any) {
    return this.http.post<any>(this._url + 'inputsupplier/seed/download/', file).pipe(map((res: any) => {
      return res;
    }));
  }

  addseed(formdata) {
    return this.http.post<any>(this._url + 'inputsupplier/seed/', formdata).pipe(map((res: any) => {
      return res;
    }));
  }
 
  updateseed(data, formdata) {
    return this.http.put<any>(this._url + 'inputsupplier/seed/' + data, formdata).pipe(map((res: any) => {

      return res;
    }));
  }


  deleteseed(data) {
    return this.http.delete<any>(this._url + 'inputsupplier/seed/' + data).pipe(map((res: any) => {
      return res;
    }));
  }

// ------------------------ Fertilizer -----------------------------------


getallfertilizer(masterId){
  return  this.http.get<any>(this._url+'inputsupplier/fertilizer/getall/' +masterId).pipe(map((res:any)=>{
        return res;
      }));
}

uploadFilefertilizer(file: any) {
  return this.http.post<any>(this._url + 'inputsupplier/fertilizer/download/', file).pipe(map((res: any) => {
    return res;
  }));
}

ftype()
{
  return this.http.get<any>(this._url + 'inputsupplier/fertilizer/fertilizertype/getall').pipe(map((res:any)=>{
    return res;
  }))
}

fsubtype(id)
{
  return this.http.get<any>(this._url + 'inputsupplier/fertilizer/fertilizername/'+id).pipe(map((res:any)=>{
    return res;
  }))
}


addfertilizer(data: any) {
  return this.http.post<any>(this._url + 'inputsupplier/fertilizer', data).pipe(map((res: any) => {
    return res;
  }));
}

updatefertilizer(data, formdata) {
  return this.http.put<any>(this._url + 'inputsupplier/fertilizer/' + data, formdata).pipe(map((res: any) => {

    return res;
  }));
}


deletefertilizer(data) {
  return this.http.delete<any>(this._url + 'inputsupplier/fertilizer/' + data).pipe(map((res: any) => {
    return res;
  }));
}

// ---------------- Machinery -----------------------------------

getallMachinery(masterId){
  return  this.http.get<any>(this._url+'inputsupplier/machinery/getall/'+masterId).pipe(map((res:any)=>{
        return res;
      }));
}

uploadFileMachinery(file: any) {
  return this.http.post<any>(this._url + 'inputsupplier/machinery/download/', file).pipe(map((res: any) => {
    return res;
  }));
}

addMachinery(formdata) {
  return this.http.post<any>(this._url + 'inputsupplier/machinery/', formdata).pipe(map((res: any) => {
    return res;
  }));
}

mtype()
{
  return this.http.get<any>(this._url + 'inputsupplier/machinery/equipmenttype/getall').pipe(map((res:any)=>{
    return res;
  }))
}

machineryname(id){
  return this.http.get<any>(this._url + 'inputsupplier/machinery/equipmentname/' +id).pipe(map((res:any)=>{
    return res;
  }))
}


updateMachinery(data, formdata) {
  return this.http.put<any>(this._url + 'inputsupplier/machinery/' + data, formdata).pipe(map((res: any) => {
// return this.http.put<any>(this._url+'/inputsupplier/machinery/update/{id}'+data.id,formdata)
    return res;
  }));
}


deleteMachinery(id) {
  return this.http.delete<any>(this._url + 'inputsupplier/machinery/' + id).pipe(map((res: any) => {
    return res;
  }));
}


// ---------------- insecticide -----------------------------------

getallinsecticide(masterId){
  return  this.http.get<any>(this._url+`inputsupplier/insecticide/getall/${masterId}`).pipe(map((res:any)=>{
        return res;
      }));
}

uploadFileinsecticide(file: any) {
  return this.http.post<any>(this._url + 'inputsupplier/insecticide/download/', file).pipe(map((res: any) => {
    return res;
  }));
}

addinsecticide(FormData) {
  return this.http.post<any>(this._url + 'inputsupplier/insecticide/', FormData).pipe(map((res: any) => {
    return res;
  }));
}

insecttypes()
{

  return this.http.get<any>(this._url + 'inputsupplier/insecticide/insecticidetype/getall').pipe(map((res: any) => {
    return res;
  }));

 
}

updateinsecticide(data, formdata) {
  return this.http.put<any>(this._url + 'inputsupplier/insecticide/' + data, formdata).pipe(map((res: any) => {

    return res;
  }));
}


deleteinsecticide(data) {
  return this.http.delete<any>(this._url + 'inputsupplier/insecticide/' + data).pipe(map((res: any) => {
    return res;
  }));
}





// -------------------Compaints ----------------------------------


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
