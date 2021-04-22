import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

@Component({
  selector: 'app-crop-production',
  templateUrl: './crop-production.component.html',
  styleUrls: ['./crop-production.component.css']
})
export class CropProductionComponent implements OnInit {

  productionForm: FormGroup;
  submitted = false;
  cropProductions:Array<any>=[];
  cropVarieties:Array<any>=[];
  crops:Array<any>=[];
  seasons:Array<any>=[];
  p:number = 1;
  edit = false;
  mqError:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.productionForm = this.formBuilder.group({
      season: ['', [Validators.required]],
      cropId: ['', [Validators.required]],
      verietyId: ['', [Validators.required]],
      actualQuantity: ['', [Validators.required]],
      marketableQuantity: ['', [Validators.required]],
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:[]
    });
    this.getCropProduction();
   // this.getCropList();
    this.getSeasonList();
  }

  // getCropList(){
  //   this.api.getCropList().subscribe(
  //     response => {
  //     console.log(response);
  //     this.crops = response;
  //   })
  // }

  getCropsBySeasonId(seasonId){
    this.api.getCropsBySeasonId(seasonId).subscribe(
      response => {
      this.crops = response;
    })
  }

  getCropVarietiesByCropId(cropId){
    this.api.getCropVarietiesByCropId(cropId).subscribe(
      response => {
      console.log(response);
      this.cropVarieties = response;
    })
  }

  getSeasonList(){
    this.api.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getCropProduction(){
    console.log(localStorage.getItem('masterId'));
    this.api.getCropProductionDetails(localStorage.getItem('masterId')).subscribe(data => {
      console.log(data);
      this.cropProductions = data;
    },
      err => {
        console.log(err)
      }
    );
  }

  addCropProduction() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productionForm.invalid) {
        return;
    }

    this.productionForm.patchValue({
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId')
    });
    var data = this.productionForm.value;

    // data['crop_id'] = {"cropId":this.productionForm.value.cropId};
    // data['verietyId'] = {"verietyId":this.productionForm.value.verietyId};
    data['crop_id'] = this.productionForm.value.cropId;
    delete data.cropId;
    console.log(data);
    this.api.addCropProduction(data).subscribe(response => {
      console.log(response);
      this.toastr.success('Crop Production Added Successfully.');
      this.submitted = false;
      this.productionForm.reset();
      this.getCropProduction();
    },
      err => {
        console.log(err)
      }
    );
  }

  updateCropProduction(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.productionForm.invalid) {
        return;
    }
    this.productionForm.patchValue({
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId')
    });
    var data = this.productionForm.value;
    // data['crop_id'] = {"cropId":this.productionForm.value.cropId};
    // data['verietyId'] = {"verietyId":this.productionForm.value.verietyId};
    data['crop_id'] = this.productionForm.value.cropId;
    delete data.cropId;
    console.log(data);
    this.api.updateCropProduction(data).subscribe(response => {
      this.toastr.success('Crop Production Updated Successfully.');
        this.submitted = false;
        this.edit = false;
        this.productionForm.reset();
        this.getCropProduction();
    },
      err => {
        console.log(err)
      }
    );
  }

  resetForm(){
    this.productionForm.reset();
    this.submitted=false;
    this.edit = false;
  }

  editCropProduction(production){
    console.log(production);
    console.log(localStorage.getItem('userrole'));
    this.getCropsBySeasonId(production.season_id);
    this.getCropVarietiesByCropId(production.crop_id);
    this.productionForm = this.formBuilder.group({
      season: [production.season_id, [Validators.required]],
      cropId: [production.crop_id, [Validators.required]],
      verietyId: [production.veriety_id, [Validators.required]],
      actualQuantity: [production.actual_quantity, [Validators.required]],
      marketableQuantity: [production.marketable_quantity, [Validators.required]],
      id:[production.marketable_id],
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
    });
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.productionForm.patchValue({
        cropId:production.crop_id,
        verietyId:production.veriety_id
      });
    }, 1000);
    this.productionForm.patchValue({
      verietyId:production.veriety_id
    });
    this.edit = true;
    window.scroll(0,0);
  }

  confirmDelete(marketable_id){
    if(confirm("Are you sure to delete this item")) {
      this.api.deleteCropProduction(marketable_id).subscribe(response => {
        this.toastr.success('Crop Production Deleted Successfully.');
          this.getCropProduction();
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  get formControls(){
    return this.productionForm.controls;
  }

  checkMQ(){
    var mq = (120 * this.productionForm.value.actualQuantity) / 100;
    this.mqError = false;
    if(this.productionForm.value.marketableQuantity > mq){
      this.mqError = true;
      return true;
    }
    return false;
  }
}
