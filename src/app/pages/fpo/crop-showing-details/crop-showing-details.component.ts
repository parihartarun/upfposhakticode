import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductionService } from 'src/app/_services/production/production.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-crop-showing-details',
  templateUrl: './crop-showing-details.component.html',
  styleUrls: ['./crop-showing-details.component.css']
})
export class CropShowingDetailsComponent implements OnInit {
  closeResult = '';

  //cropSowingData: BehaviorSubject<any> = new BehaviorSubject([]);
  cropSowingData:Array<any>=[];

  cropSowingForm: FormGroup;
  cropSowingUpdateForm: FormGroup;
  farmerForm:FormGroup;
  submitted = false;
  equipments:Array<any>=[];
  farmers:Array<any>=[];
  crops:Array<any>=[];
  cropVarieties:Array<any>=[];
  varieties:Array<any>=[];
  seasons:Array<any>=[];
  p:number = 1;
  edit = false;
  orderBy: { order: string, key: string } = { order: '', key: '' };
  currentPage = 1;
  searchText = '';
  sowingError:boolean = false;
  mqError:boolean = false;
  msQuantityPercentage:number;
  farmerLogin = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private commonService:CommonService,
    private api: ProductionService,
    private route: Router,
    private toastr:ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('userRole') == 'ROLE_FARMER'){
      this.farmerLogin = true;
    }

    this.cropSowingForm  = this.formBuilder.group({
      list: this.formBuilder.array([this.initItemRows()]),
      farmerId: ['', [Validators.required]],
      guardianName: [''],
      seasonRefName: ['',[Validators.required]],
      baseland:[''],
      masterId:localStorage.getItem('masterId'),
    });
    
    this.getCropSowingDetails();
    this.getMarkatableQuantityMeasurements();
    this.getCropList();
    this.getSeasonList();

    if(this.farmerLogin == true){
      this.getFarmerDetails(localStorage.getItem('masterId'));
    }else{
      this.getFarmers();
    }
  }

  initItemRows() {
    return this.formBuilder.group({
      sowingArea: ['', [Validators.required]],
      cropRefName: [undefined, [Validators.required]],
      verietyRef: [undefined,[Validators.required]],
      expectedYield:['', [Validators.required]],
      actualYield:[''],
      marketableQuantity:[''],
      masterId:localStorage.getItem('masterId'),
      sowingId:[''],
      crop_id:['']
    });
  }

  get formArr() {
    return this.cropSowingForm.get('list') as FormArray;
  }
  
  addNewRow() {
    let varlist  =  this.cropSowingForm.get('list') as FormArray;
    varlist.push(this.initItemRows());
    return varlist;
  }
  
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  getFarmers(){
    this.commonService.getFarmerDetailList(localStorage.getItem('masterId')).subscribe(
      response => {
      console.log(response);
      this.farmers = response;
    })
  }

  getSeasonList(){
    this.commonService.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getCropsBySeasonId(seasonId){
    this.commonService.getCropsBySeasonId(seasonId).subscribe(
      response => {
      this.crops = response;
    })
  }

  getCropList(){
    this.commonService.getCropList().subscribe(
      response => {
      console.log(response);
      this.crops = response;
    })
  }

  getCropVarietiesByCropId(cropId,i){
    console.log(cropId, i);
    let list = this.cropSowingForm.get('list') as FormArray
    list.at(i).get("cropRefName").setValue(cropId)
    console.log(cropId);
    this.commonService.getCropVarietiesByCropId(cropId).subscribe(
      response => {
      console.log(response);
      this.cropVarieties = response;
    })
  }

  setCropVarieties(event,i){
    let list = this.cropSowingForm.get('list') as FormArray
    list.at(i).get("verietyRef").setValue(event)
  }
  
  getFarmerDetails(farmerId){
    this.api.getFarmerDetailsForCropSowing(farmerId).subscribe(response => {
      console.log(response);
      if(response != null){
        this.cropSowingForm.controls.baseland.patchValue(response.land_area);
        this.cropSowingForm.controls.guardianName.patchValue(response.parantsName);
        if(this.farmerLogin == true){
          this.farmers = [
            {
              farmerId:farmerId,
              farmerName:response.farmerName
            }
          ];
          this.cropSowingForm.controls.farmerId.patchValue(farmerId);
        }
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  getCropSowingDetails(){
    var data = {};
    data['masterId'] = localStorage.getItem('masterId');

    if(this.farmerLogin == true){
      data['farmerId'] = localStorage.getItem('masterId');
    }
    this.api.getFarmerCropSowingDetails(data).subscribe(response => {
      console.log(response);
      this.cropSowingData = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  getMarkatableQuantityMeasurements(){
    this.commonService.getMarkatableQuantityMeasurements().subscribe(response => {
      console.log(response);
      //this.msQuantityPercentage = response;
      this.msQuantityPercentage = 20;
    },
      err => {
        console.log(err)
      }
    );
  }

  addSowingDetails(){
    this.submitted = true;
    // stop here if form is invalid
    this.sowingError = false;
    if(this.cropSowingForm.controls.list.status == 'INVALID'){
      this.sowingError = true;
    }

    if (this.cropSowingForm.invalid) {
        return;
    }

    var data = this.cropSowingForm.value;
    this.api.addFarmerCropSowingDetails(data).subscribe(response => {
      console.log(response);
      this.toastr.success('Crop sowing details added successfully.');
      this.submitted = false;
      this.cropSowingForm.reset();
      this.getCropSowingDetails();
    },
      err => {
        console.log(err)
      }
    );
  }

  checkMQ(i){
    var mq = (120 * this.cropSowingForm.value.list[i]['actualYield']) / 100;
    this.mqError = false;
    if(this.cropSowingForm.value.list[i]['marketableQuantity'] > mq){
      this.mqError = true;
      return true;
    }
    return false;
  }

  reset(){
    this.submitted = false;
    this.cropSowingForm.reset();
    this.sowingError = false;
  }


  editCropSowingDetails(data, content){
    console.log(data);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.getVarieties(data.crop_master_id);
    this.cropSowingUpdateForm  = this.formBuilder.group({
      farmerId: [data.farmer_id, [Validators.required]],
      guardianName: [data.father_husband_name],
      seasonRefName: [data.season_ref,[Validators.required]],
      baseland:[data.land_area],
      sowingArea: [data.sowing_area, [Validators.required]],
      cropRefName: [data.crop_master_id, [Validators.required]],
      verietyRef: [data.veriety_ref,[Validators.required]],
      expectedYield:[data.ex_yield, [Validators.required]],
      actualYield:[data.actual_yield],
      marketableQuantity:[data.marketable_quantity],
      sowingId:[data.sowing_id],
      crop_id:[data.crop_id],
      masterId:localStorage.getItem('masterId'),
    });
    setTimeout(()=>{     
      this.cropSowingUpdateForm.patchValue({
        cropRefName:data.crop_master_id,
        verietyRef:data.veriety_ref
      });
    }, 2000);
  }

  updateSowingDetails(){
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.cropSowingUpdateForm.value);
    if (this.cropSowingUpdateForm.invalid) {
        return;
    }

    var data = this.cropSowingUpdateForm.value;
    this.api.updateFarmerCropSowingDetails(data).subscribe(response => {
      console.log(response);
      this.toastr.success('Crop sowing details updated successfully.');
      this.submitted = false;
      this.getCropSowingDetails();
    },
      err => {
        console.log(err)
      }
    );
  }

  getVarieties(cropId){
    this.commonService.getCropVarietiesByCropId(cropId).subscribe(
      response => {
        console.log(response);
      this.varieties = response;
    })
  }

  confirmDelete(id){
    console.log(id);
    if(confirm("Are you sure to delete this item.")) {
      this.api.deleteFarmerCropSowingDetails(id).subscribe(response => {
        this.getCropSowingDetails();
        if(response != ''){
          this.toastr.success('Sowing details Deleted successfully.');
        }else{
          this.toastr.error('Error! While Deleting Crop Sowing.');
        }
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sortOrder(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };

  }
  onInputSearch() {
    this.currentPage = 1;
  }

  get formControls(){
    return this.cropSowingForm.controls;
  }
}
