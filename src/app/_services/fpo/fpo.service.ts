import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FpoService {
  //------------Dashboard Data ------------------------------
  getDashboardData() {
    return this.http.get<any>(this._url + `api/fpo/dashboard`).pipe(map((res: any) => {
      return res;
    }));
  }
  getIndentByFpoId(fpoid) {
    let params: HttpParams = new HttpParams();
    params = params.append("fpoId", fpoid);
    return this.http.get<any>(this._url + `enquiry/findByFpo`, { params: params }).pipe(map((res: any) => {

      return res;
    }));
  }
  getIndentByUserId(fpoid) {
    let params: HttpParams = new HttpParams();
    params = params.append("id", fpoid);
    return this.http.get<any>(this._url + `enquiry/findByUser`, { params: params }).pipe(map((res: any) => {

      return res;
    }));
  }

  getChartDetails(masterId) {
    return this.http.get<any>(this._url + `api/fpo/dashboard/getAllFpoDashboardData?master_id=` + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  getBlocks() {
    return this.http.get<any>(this._url + `api/v1/block/getBlocks`).pipe(map((res: any) => {
      return res;
    }));
  }
  //------------api for getting equipment list ------------------------------
  getDistricts() {
    return this.http.get<any>(this._url + 'api/v1/District/getDistricts').pipe(map((res: any) => {
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
  getFpoProfileByUsername(username) {
    return this.http.get<any>(this._url + `api/fpos/getByUsername/${username}`).pipe(map((res: any) => {
      return res;
    }));
  }

  updateProfile(data) {
    return this.http.get<any>(this._url + `api/fpos/${data.fpoId}`, data).pipe(map((res: any) => {
      return res;
    }));
  }


  //------------api for getting equipment list ------------------------------
  getEquipList() {
    return this.http.get<any>(this._url + 'api/equipments').pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerMachineryBankList() {
    return this.http.get<any>(this._url + 'signin').pipe(map((res: any) => {
      return res;
    }));
  }
  addFarmerMachineryBank(data: any) {
    return this.http.get<any>(this._url + 'signin').pipe(map((res: any) => {
      return res;
    }));
  }
  deleteFarmerMachineryBankList(id: number) {
    return this.http.get<any>(this._url + 'signin').pipe(map((res: any) => {
      return res;
    }));
  }
  updateFarmerMachineryBankList(id: number, data: any) {
    return this.http.get<any>(this._url + 'signin').pipe(map((res: any) => {
      return res;
    }));
  }
  //=====================================================================================
  getBoardMembers(masterId) {
    return this.http.get<any>(this._url + 'api/fpos/boardmember/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  addBoardMember(data) {
    return this.http.post<any>(this._url + 'api/fpos/boardmember', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateBoardMember(data) {
    return this.http.put<any>(this._url + 'api/fpos/boardmember/editBoardMember/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteBoardMember(id) {
    return this.http.delete<any>(this._url + 'api/fpos/boardmember/deleteBoardMember/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** License **********************************/
  getLicense(masterId) {
    return this.http.get<any>(this._url + 'api/fpo/license/getFpoLicenseDetailsByFpoId/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  getLicenseTypes() {
    return this.http.get<any>(this._url + 'api/licenses').pipe(map((res: any) => {
      return res;
    }));
  }

  addLicense(data) {
    return this.http.post<any>(this._url + 'api/fpo/license', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateLicense(data) {
    return this.http.put<any>(this._url + 'api/fpo/license/updateLicense/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteLicense(id) {
    return this.http.delete<any>(this._url + 'api/fpo/license/deleteLicense/' + id).pipe(map((res: any) => {
      return res;
    }));
  }


  /************************** Machinary banks **********************************/
  getMachinaryBanks(masterId) {
    return this.http.get<any>(this._url + 'api/farm/machinery/banks/getFarmMachineryBankByFpo/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  getEquipments() {
    return this.http.get<any>(this._url + 'api/equipments').pipe(map((res: any) => {
      return res;
    }));
  }

  addMachinaryBank(data) {
    return this.http.post<any>(this._url + 'api/farm/machinery/banks', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateMachinaryBank(data) {
    return this.http.put<any>(this._url + 'api/farm/machinery/banks/updateMachinery/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteMachinaryBank(id) {
    return this.http.delete<any>(this._url + 'api/farm/machinery/banks/deleteMachinery/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** FPO's Crop Production **********************************/
  getCropProductionDetails(masterId) {
    return this.http.get<any>(this._url + 'marketablesurplus/getFpoCropProductionDetails/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  addCropProduction(data) {
    return this.http.post<any>(this._url + 'marketablesurplus', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateCropProduction(data) {
    return this.http.put<any>(this._url + 'marketablesurplus/update/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteCropProduction(id) {
    return this.http.delete<any>(this._url + 'marketablesurplus/delete/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerWiseProductionReport(data) {
    return this.http.post<any>(this._url + 'farmerWiseProductionReport/getFarmerProductionReport', data).pipe(map((res: any) => {
      return res;
    }));
  }

  exportProductionReport(fileFormat) {
    return this.http.get<any>(this._url + 'marketablesurplus/exportProductionReport/' + fileFormat).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** FPO's Sales Details **********************************/
  getFpoSalesInfo(masterId) {
    return this.http.get<any>(this._url + 'fposalesdetails/getFpoSalesDetails/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  addFpoSalesInfo(data) {
    return this.http.post<any>(this._url + 'fposalesdetails/addFpoSalesDetails', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateFpoSalesInfo(data) {
    return this.http.put<any>(this._url + 'fposalesdetails/updateFpoSalesDetails/' + data.id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteFpoSalesInfo(id) {
    return this.http.delete<any>(this._url + 'fposalesdetails/deleteFpoSalesDetails/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** FPO's Services/Production **********************************/

  getServices() {
    return this.http.get<any>(this._url + 'fposervices/getall').pipe(map((res: any) => {
      return res;
    }));
  }

  addService(data) {
    return this.http.post<any>(this._url + 'fposervices', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateService(data, id) {
    return this.http.put<any>(this._url + 'fposervices/' + id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteService(id) {
    return this.http.delete<any>(this._url + 'fposervices/delete/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** FPO's Photographs **********************************/

  getPhotographs(masterId) {
    return this.http.get<any>(this._url + 'photo/getPhotoByFpo/'+masterId).pipe(map((res: any) => {
      return res;
    }));
  };

  addPhotograph(data: any) {
    return this.http.post<any>(this._url + 'photo', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updatePhotograph(id: any, data: any) {
    return this.http.put<any>(this._url + 'photo/' + id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  // Delete photograph
  deletePhotograph(id) {
    return this.http.delete<any>(this._url + 'photo/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  /************************** FPO's  Complaints/ Suggestions **********************************/
  getComplaints_Suggestions() {
    return this.http.get<any>(this._url + 'complaint/catgories').pipe(map((res: any) => {
      return res;
    }));
  }
  uopladFile(file: any) {
    return this.http.post<any>(this._url + 'complaint/upload', file).pipe(map((res: any) => {
      return res;
    }));
  }
  getComplaints(id) {
    return this.http.get<any>(this._url + 'fpocomplaint/fpo/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getComplaintsFpoFarmer(id) {
    return this.http.get<any>(this._url + 'fpocomplaint/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  addComplaint(data: any) {
    return this.http.post<any>(this._url + 'fpocomplaint', data).pipe(map((res: any) => {
      return res;
    }));
  }
  deleteCompliant(data) {
    return this.http.delete<any>(this._url + 'complaint/' + data).pipe(map((res: any) => {
      return res;
    }));
  }
  updateComplaint(data, formdata) {
    return this.http.put<any>(this._url + 'complaint/dept/' + data.id, formdata).pipe(map((res: any) => {

      return res;
    }));
  }
  updateStatusComplaint(data, formdata) {
    return this.http.put<any>(this._url + 'complaint/complaintstatus/' + data.id, formdata).pipe(map((res: any) => {

      return res;
    }));
  }
  /****************************************fpo land details************************************ */
  getLandDetailList(id) {
    return this.http.get<any>(this._url + 'api/fpos/landfarmer/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerListsByFpoId(id: number) {
    return this.http.get<any>(this._url + 'api/fpos/land/farmer/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerDetailList(masterId) {
    return this.http.get<any>(this._url + 'api/Farmer/getFarmerDetails/' + masterId).pipe(map((res: any) => {
      return res;
    }));
  }

  getCropList() {
    return this.http.get<any>(this._url + 'api/v1/cropMasterDetails/getCropDetails').pipe(map((res: any) => {
      return res;
    }));
  }

  getSeasonList() {
    return this.http.get<any>(this._url + 'api/v1/seasonMaster/getSeasons').pipe(map((res: any) => {
      return res;
    }));
  }

  getCropVarietiesByCropId(cropId) {
    return this.http.get<any>(this._url + 'api/v1/cropVarietyDetails/getCropVarietiesByCropId/' + cropId).pipe(map((res: any) => {
      return res;
    }));
  }

  getCropsBySeasonId(seasonId) {
    return this.http.get<any>(this._url + 'api/v1/cropMasterDetails/getCropsBySeasonId/' + seasonId).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerCropSowingDetails(data) {
    return this.http.post<any>(this._url + 'fpoCropSowing/getFarmerCropSowingDetails/', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getFarmerDetailsForCropSowing(farmerId) {
    return this.http.get<any>(this._url + 'fpoCropSowing/getFarmerDetailsForCropSowing/'+farmerId).pipe(map((res: any) => {
      return res;
    }));
  }

  addFarmerCropSowingDetails(data){
    return this.http.post<any>(this._url + 'fpoCropSowing/addFarmerCropSowingDetails', data).pipe(map((res: any) => {
      return res;
    }));
  }

  updateFarmerCropSowingDetails(data){
    return this.http.put<any>(this._url + 'fpoCropSowing/updateFarmerCropSowingDetails/'+data.crop_id, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteFarmerCropSowingDetails(cropId){
    return this.http.delete<any>(this._url + 'fpoCropSowing/deleteCropSowingDetails/'+cropId).pipe(map((res: any) => {
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

  deleteFarmer(id: any) {
    return this.http.delete<any>(this._url + 'api/Farmer/deleteFarmer/' + id).pipe(map((res: any) => {
      return res;
    }));
  }

  getfpoDetialById(fpoId: number) {
    return this.http.get<any>(this._url + 'api/fpos/' + fpoId).pipe(map((res: any) => {
      return res;
    }));
  }
  getFPOGuideLinePreRegistration() {
    return this.http.get<any>(this._url + 'fpoguidelines/PREREGISTRATION').pipe(map((res: any) => {
      return res;
    }));
  }
  getFPOGuideLinePostRegistration() {
    return this.http.get<any>(this._url + 'fpoguidelines/POSTREGISTRATION').pipe(map((res: any) => {
      return res;
    }));
  }

  /*******************************production details************************* */

  // =========================================profile page Apis by ======================

  getBoardMemberById(data) {
    return this.http.get<any>(this._url + 'api/fpos/boardmember/getBoardMemberById/' + data).pipe(map((res: any) => {
      return res;
    }));
  }


  getById(data: number) {
    return this.http.get<any>(this._url + 'api/fpos/' + data).pipe(map((res: any) => {
      return res;
    }));
  }

  getAdditionServiceById(data: number) {
    return this.http.get<any>(this._url + 'api/fpos/FpoAdditionalServices/getFpoAdditionalServicesById/' + data).pipe(map((res: any) => {
      return res;
    }));

  }
  getAllNotificationBydept(id) {
    return this.http.get<any>(this._url + 'notification/fponotification/' + id).pipe(map((res: any) => {
      return res;
    }))
  }
  sendNotifiaction(data, formData) {
    return this.http.post<any>(this._url + 'notification/farmersend', formData).pipe(map((res: any) => {
      return res;
    }))
  }
  getAllFarmer() {

    return this.http.get<any>(this._url + 'api/farmer').pipe(map((res: any) => {
      return res;
    }));
  }
  getAllNotificationByFpo(id) {

    return this.http.get<any>(this._url + 'notification/fponotification/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getfamerDetail(id) {
    return this.http.get<any>(this._url + 'fpocomplaint/farmerComplaint/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllNotificationFpo(id) {

    return this.http.get<any>(this._url + 'notification/viewfponotification/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllNotificationDept(id) {

    return this.http.get<any>(this._url + 'notification/viewdeptnotification/' + id).pipe(map((res: any) => {
      return res;
    }));
  }
  getAllStorageUnitByFpo(id) {
    return this.http.get<any>(this._url + 'api/collectioncenters/getAllByFpo/' + id);
  }
  getFarmMachineryBankByFpo(id) {
    return this.http.get<any>(this._url + 'api/farm/machinery/banks/getFarmMachineryBankByFpo/' + id);
  }
  getFpoPhoto(id) {
    return this.http.get<any>(this._url + 'photo/getPhotoByFpo/' + id);
  }
}






