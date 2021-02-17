import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FpoService } from '../../../_services/fpo/fpo.service';
@Component({
  selector: 'app-crop-showing-details',
  templateUrl: './crop-showing-details.component.html',
  styleUrls: ['./crop-showing-details.component.css']
})
export class CropShowingDetailsComponent implements OnInit {
 
  cropSowingForm: FormGroup;
  farmerForm:FormGroup;
  submitted = false;
  equipments:Array<any>=[];
  farmers:Array<any>=[];
  crops:Array<any>=[];
  cropVarieties:Array<any>=[];
  seasons:Array<any>=[];
  p:number = 1;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.cropSowingForm  = this.formBuilder.group({
      list: this.formBuilder.array([this.initItemRows()]),
      farmerId: ['', [Validators.required]],
      guardianName: [''],
      seasonRefName: ['',[Validators.required]],
      baseland:[''],
      masterId:localStorage.getItem('masterId'),
    });
    this.getCropSowingDetails();
    this.getFarmers();
    this.getCropList();
    this.getSeasonList();
  }

  initItemRows() {
    return this.formBuilder.group({
      sowingArea: ['', [Validators.required]],
      cropRefName: [undefined, [Validators.required]],
      verietyRef: [undefined,[Validators.required]],
      expectedYield:['', [Validators.required]],
      actualYield:['', [Validators.required]],
      masterId:localStorage.getItem('masterId'),
      sowingId:[]
    });
  }

  get formArr() {
    return this.cropSowingForm.get('list') as FormArray;
  }
  setCropVarieties(event,i)
  {
    let list = this.cropSowingForm.get('list') as FormArray
 list.at(i).get("verietyRef").setValue(event)
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
    this.api.getFarmerDetailList(localStorage.getItem('masterId')).subscribe(
      response => {
      console.log(response);
      this.farmers = response;
    })
  }

  getSeasonList(){
    this.api.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getCropList(){
    this.api.getCropList().subscribe(
      response => {
      console.log(response);
      this.crops = response;
    })
  }

  getCropVarietiesByCropId(cropId,i){
    let list = this.cropSowingForm.get('list') as FormArray

    list.at(i).get("cropRefName").setValue(cropId)
    console.log(cropId);
    this.api.getCropVarietiesByCropId(cropId).subscribe(
      response => {
      console.log(response);
      this.cropVarieties = response;
    })
  }

  getFarmerDetails(farmerId){
    console.log(farmerId);
    this.api.getFarmerDetailsForCropSowing(farmerId).subscribe(response => {
      console.log(response);
      if(response != null){
        this.cropSowingForm.controls.baseland.patchValue(response.land_area);
        this.cropSowingForm.controls.guardianName.patchValue(response.parantsName);
      }

    },
      err => {
        console.log(err)
      }
    );
  }

  getCropSowingDetails(){
    this.api.getFarmerDetailsForCropSowing(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addSowingDetails(){
    this.submitted = true;
    // stop here if form is invalid
    console.log("Values are = "+JSON.stringify(this.cropSowingForm.value));
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
}
