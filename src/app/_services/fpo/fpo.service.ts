import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }  from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FpoService {
   //------------Dashboard Data ------------------------------
  getDashboardData(){
    return  this.http.get<any>(this._url+`api/fpo/dashboard`).pipe(map((res:any)=>{
      return res;
    }));
  }

  getChartDetails(masterId){
    return  this.http.get<any>(this._url+`api/fpo/dashboard/getAllFpoDashboardData?master_id=`+masterId).pipe(map((res:any)=>{
      return res;
    }));
  }

  getBlocks()
  {
    return  this.http.get<any>(this._url+`api/v1/block/getBlocks`).pipe(map((res:any)=>{
      return res;
    }));
  }
  //------------api for getting equipment list ------------------------------
  getDistricts(){
    return this.http.get<any>(this._url + 'api/v1/District/getDistricts' ).pipe(map((res: any) => {
      return res;
    }));
  }

  _url: string;
  constructor(private http: HttpClient) { 
    this._url = environment.baseUrl;
  }
//======================== apis added by kaustubh =====================================
  getAllFpo() {
   
    return this.http.get<any>(this._url + 'api/fpos').pipe(map((res: any) => {
      return res;
    }));
  }
getFpoProfileByUsername(username)
{
  return  this.http.get<any>(this._url+`api/fpos/getByUsername/${username}`).pipe(map((res:any)=>{
    return res;
  }));
}

updateProfile(data){
  return  this.http.get<any>(this._url+`api/fpos/${data.fpoId}`, data).pipe(map((res:any)=>{
    return res;
  }));
}


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
    return  this.http.get<any>(this._url+'api/fpos/boardmember').pipe(map((res:any)=>{
      return res;
    }));
  }

  addBoardMember(data){
    return  this.http.post<any>(this._url+'api/fpos/boardmember', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateBoardMember(data){
    return  this.http.put<any>(this._url+'api/fpos/boardmember/editBoardMember/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteBoardMember(id){
    return  this.http.delete<any>(this._url+'api/fpos/boardmember/deleteBoardMember/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  /************************** License **********************************/
  getLicense(){
    return  this.http.get<any>(this._url+'api/fpo/license').pipe(map((res:any)=>{
      return res;
    }));
  }

  getLicenseTypes(){
    return  this.http.get<any>(this._url+'api/licenses').pipe(map((res:any)=>{
      return res;
    }));
  }

  addLicense(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateLicense(data){
    return  this.http.put<any>(this._url+'api/fpo/license/updateLicense/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteLicense(id){
    return  this.http.delete<any>(this._url+'api/fpo/license/deleteLicense/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }
 

  /************************** Machinary banks **********************************/
  getMachinaryBanks(){
    return  this.http.get<any>(this._url+'api/farm/machinery/banks').pipe(map((res:any)=>{
      return res;
    }));
  }

  getEquipments(){
    return  this.http.get<any>(this._url+'api/equipments').pipe(map((res:any)=>{
      return res;
    }));
  }

  addMachinaryBank(data){
    return  this.http.post<any>(this._url+'api/farm/machinery/banks', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateMachinaryBank(data){
    return  this.http.put<any>(this._url+'api/farm/machinery/banks/updateMachinery/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteMachinaryBank(id){
    return  this.http.delete<any>(this._url+'api/farm/machinery/banks/deleteMachinery/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

  /************************** FPO's Crop Production **********************************/
  getCropProduction(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addCropProduction(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getStorageUnits(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  addStorageUnit(data){
    return  this.http.post<any>(this._url+'api/fpo/license', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  /************************** FPO's Sales Details **********************************/
  getFpoSalesInfo(){
    return  this.http.get<any>(this._url+'api/fposalesdetails/getall').pipe(map((res:any)=>{
      return res;
    }));
  }

  addFpoSalesInfo(data){
    return  this.http.post<any>(this._url+'api/fposalesdetails/insert', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateFpoSalesInfo(data){
    return  this.http.put<any>(this._url+'api/fposalesdetails/update1/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteFpoSalesInfo(id){
    return  this.http.delete<any>(this._url+'api/fposalesdetails/delete1/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  
   getServices(){
    return  this.http.get<any>(this._url+'FPOServices/getall').pipe(map((res:any)=>{
      return res;
    }));
  }

  addService(data){
    return  this.http.post<any>(this._url+'FPOServices/insert', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updateService(data){
    return  this.http.post<any>(this._url+'FPOServices/update/'+data.id, data).pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteService(id){
    return  this.http.delete<any>(this._url+'FPOServices/delete/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

   /************************** FPO's Photographs **********************************/

  getPhotographs(){
    console.log('get api call')
    return  this.http.get<any>(this._url+'photo').pipe(map((res:any)=>{
      return res;
    }));
  };

  addPhotograph(data: any){
    console.log('add image===', data)
    return  this.http.post<any>(this._url+'photo', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  updatePhotograph(data:any){
    return  this.http.post<any>(this._url+'photo', data).pipe(map((res:any)=>{
      return res;
    }));
  }

  // Delete photograph
  deletePhotograph(id){
    return  this.http.delete<any>(this._url+'photo/'+id).pipe(map((res:any)=>{
      return res;
    }));
  }

/************************** FPO's  Complaints/ Suggestions **********************************/
  getComplaints_Suggestions() {
    return this.http.get<any>(this._url + 'complaint/catgories').pipe(map((res: any) => {
      return res;
    }));
  }

  uopladFile(file:any) {
    return this.http.post<any>(this._url + 'complaint/upload', file).pipe(map((res: any) => {
      return res;
    }));
  }

  getComplaints() {
    return this.http.get<any>(this._url + 'complaint').pipe(map((res: any) => {
      return res;
    }));
  }

  addComplaint(data:any) {
    console.log('data in com===>',data)
    return this.http.post<any>(this._url + 'complaint', data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteCompliant(data) {
    return this.http.delete<any>(this._url + 'complaint/'+data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateComplaint(data) {
    return this.http.put<any>(this._url + 'complaint/update1/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  /****************************************fpo land details************************************ */
  getLandDetailList(id) {
    return this.http.get<any>(this._url + 'api/fpos/landfarmer/'+id).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerListsByFpoId(id: number) {
    return this.http.get<any>(this._url + 'api/fpos/land/farmer/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerDetailList() {
    return this.http.get<any>(this._url + 'api/Farmer/getFarmerDetails').pipe(map((res: any) => {
      return res;
    }));
  }

  addLandDetails(data: any) {
    return this.http.post<any>(this._url + 'api/fpos/land', data).pipe(map((res: any) => {
      return res;
    }));
  }

  deletelandDetailById(id: number) {
    return this.http.delete<any>(this._url + 'api/fpos/land/deleteDetails/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  updateLandDetail(data: any) {
    return this.http.put<any>(this._url + 'api/fpos/land/editDetails/' + data.landId, data).pipe(map((res: any) => {
      return res;
    }));
  }

  /**************************fpo farmer apis************************ */

  // getFarmerLists(){
  //   return  this.http.get<any>(this._url+'api/fpos/land/farmer/'+id).pipe(map((res:any)=>{
  //     return res;
  //   }));
  // }

  registerFarmerByFpo(data: any) {
    return this.http.post<any>(this._url + 'register/farmer', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateFarmer(data: any) {
    console.log(data);
    return this.http.put<any>(this._url + 'api/Farmer/editFarmer/' + data.farmerId, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteFarmer(data: any) {
    return this.http.post<any>(this._url + 'api/farmer', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getfpoDetialById(fpoId: number) {

    return this.http.get<any>(this._url + 'api/fpos/' + fpoId).pipe(map((res: any) => {
      return res;
    }));
  }

}






