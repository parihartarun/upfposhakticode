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

// ------------------------ Fertilizer -----------------------------------


getallfertilizer(){
  return  this.http.get<any>(this._url+'inputsupplier/fertilizer/getall').pipe(map((res:any)=>{
        return res;
      }));
}

uploadFilefertilizer(file: any) {
  return this.http.post<any>(this._url + 'inputsupplier/fertilizer/download/', file).pipe(map((res: any) => {
    return res;
  }));
}

addfertilizer(data: any) {
  return this.http.post<any>(this._url + 'inputsupplier/fertilizer/', data).pipe(map((res: any) => {
    return res;
  }));
}

updatefertilizer(data, formdata) {
  return this.http.put<any>(this._url + '/inputsupplier/fertilizer/' + data.id, formdata).pipe(map((res: any) => {

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

addMachinery(data:any) {
  return this.http.post<any>(this._url + 'inputsupplier/machinery/', data).pipe(map((res: any) => {
    return res;
  }));
}

mtype()
{
  return this.http.get<any>(this._url + 'inputsupplier/machinery/equipmenttype/getall').pipe(map((res:any)=>{
    return res;
  }))
}


updateMachinery(data, formdata) {
  return this.http.put<any>(this._url + 'inputsupplier/machinery/' + data.id, formdata).pipe(map((res: any) => {

    return res;
  }));
}


deleteMachinery(data) {
  return this.http.delete<any>(this._url + 'inputsupplier/machinery/' + data).pipe(map((res: any) => {
    return res;
  }));
}


// ---------------- insecticide -----------------------------------

getallinsecticide(masterId){
  return  this.http.get<any>(this._url+'inputsupplier/insecticide/getall/' +masterId).pipe(map((res:any)=>{
        return res;
      }));
}

uploadFileinsecticide(file: any) {
  return this.http.post<any>(this._url + 'inputsupplier/insecticide/download/', file).pipe(map((res: any) => {
    return res;
  }));
}

addinsecticide(FormData) {
  return this.http.post<any>(this._url + 'inputsupplier/insecticide/',FormData).pipe(map((res: any) => {
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
  return this.http.put<any>(this._url + 'inputsupplier/insecticide/' + data.id, formdata).pipe(map((res: any) => {

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
