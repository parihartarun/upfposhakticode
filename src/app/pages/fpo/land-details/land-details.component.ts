import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})
export class LandDetailsComponent implements OnInit {

  p:number;
  //landDetailForm: FormGroup;

  landDetailForm = this.formBuilder.group({
    farmerName: ['', [Validators.required]],
    fatherHusbandName: ['', [Validators.required]],
    ownerShip: ['', [Validators.required]],
    areaFarm: ['', [Validators.required]],
    id:['']
  });

  landDetails:Array<any>=[];
  ownerShipList:Array<any>=[];
  FarmerLists:Array<any>=[];
  submitted = false;
  edit = false;

 constructor(
    private formBuilder: FormBuilder,
    private fpoService: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.getLandDetailList();
  }


  getLandDetailList(){
    this.fpoService.getLandDetailList().subscribe(
      response => {
      console.log(response);
      this.landDetails = response;
      })
  }

  getFarmerListsByFpoId(fpoId){
    this.fpoService.getFarmerListsByFpoId(fpoId).subscribe(
      response => {
      console.log(response);
      this.FarmerLists = response;
      })
  }

  addLandDetail() {
  this.submitted = true;
  // stop here if form is invalid
  this.fpoService.addLandDetails(this.landDetailForm.value).subscribe(response => {
      console.log(response)
      if(response.id != ''){
          this.toastr.success('Land Details Added Successfully.')
          this.submitted = false
          this.landDetailForm.reset()
      }else{
          this.toastr.error('Error! While Adding Land Details.')
      }
    },
      err => {
        console.log(err)
      })
    }
  
  updateLandDetail(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.landDetailForm.invalid) {
        return;
    }
    this.fpoService.updateLandDetail(this.landDetailForm.value).subscribe(response => {
      if(response.id != ''){
        this.toastr.success('Land Detail Updated successfully.');
        this.submitted = false;
        this.edit = false;
        this.landDetailForm.reset();
      }else{
          this.toastr.error('Error! While Updating Land Detail.');
      }
      this.getLandDetailList();
    },
      err => {
        console.log(err)
      }
    );
  }

  editLandDetail(landDetail){
    this.landDetailForm = this.formBuilder.group({
      farmerName: [landDetail.farmerName, [Validators.required]],
      fatherHusbandName: [landDetail.fatherHusbandName, [Validators.required]],
      ownerShip: [landDetail.ownership, [Validators.required]],
      areaFarm: [landDetail.areaFarm, [Validators.required]],
      id:[landDetail.id]
    });
    
    this.edit = true;
    window.scroll(0,0);
  }

  confirmDelete(landDetailId){
    if(confirm("Are you sure to delete this item")) {
      this.fpoService.deletelandDetailById(landDetailId).subscribe(response => {
        alert(JSON.stringify(response));
        if(response == true){
          this.toastr.success('Land Detail Deleted successfully.');
          this.getLandDetailList();
        }else{
            this.toastr.error('Error! While Deleting Land Detail.');
        }
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  resetForm(){
    this.landDetailForm.reset();
  }

  get formControls(){
    return this.landDetailForm.controls;
  }
}
