import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {

  salesForm: FormGroup;
  submitted = false;
  sales:Array<any>=[];
  cropVarieties:Array<any>=[];
  crops:Array<any>=[];
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
    this.salesForm = this.formBuilder.group({
      season: ['', [Validators.required]],
      cropRefName: ['', [Validators.required]],
      verietyId: ['', [Validators.required]],
      soldQuantity: ['', [Validators.required]],
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:['']
    });
    this.getFpoSalesInfo();
    //this.getCropList();
    this.getSeasonList();
  }

  getSeasonList(){
    this.api.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getCropsBySeasonId(seasonId){
    this.api.getCropsBySeasonId(seasonId).subscribe(
      response => {
      this.crops = response;
    })
  }

  // getCropList(){
  //   this.api.getCropList().subscribe(
  //     response => {
  //     console.log(response);
  //     this.crops = response;
  //   })
  // }

  getCropVarietiesByCropId(cropId){
    this.api.getCropVarietiesByCropId(cropId).subscribe(
      response => {
      console.log(response);
      this.cropVarieties = response;
    })
  }

  getFpoSalesInfo(){
    this.api.getFpoSalesInfo(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.sales = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  addFpoSalesInfo() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.salesForm.invalid) {
        return;
    }
    this.salesForm.patchValue({
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId')
    });
    console.log(this.salesForm.value);
    this.api.addFpoSalesInfo(this.salesForm.value).subscribe(response => {
      this.toastr.success('Sales info added successfully.');
      this.submitted = false;
      this.edit = false;
      this.salesForm.reset();
      this.getFpoSalesInfo();
    },
      err => {
        console.log(err)
      }
    );
  }

  editFpoSalesInfo(sale){
    this.getCropVarietiesByCropId(sale.crop_id);
    this.salesForm = this.formBuilder.group({
      season: [sale.season_id, [Validators.required]],
      cropRefName: [sale.crop_id, [Validators.required]],
      verietyId: [sale.veriety_id, [Validators.required]],
      soldQuantity: [sale.sold_quantity, [Validators.required]],
      fpoId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:[sale.id]
    });
    setTimeout(()=>{  
      this.salesForm.patchValue({
        verietyId:sale.veriety_id
      });
    }, 3000);
    this.edit = true;
    window.scroll(0,0);
  }

updateFpoSalesInfo(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.salesForm.invalid) {
      return;
  }
  this.api.updateFpoSalesInfo(this.salesForm.value).subscribe(response => {
    this.toastr.success('Sales info Updated successfully.');
    this.submitted = false;
    this.edit = false;
    this.salesForm.reset();
    this.getFpoSalesInfo();
  },
    err => {
      console.log(err)
    }
  );
}

confirmDelete(id){
  if(confirm("Are you sure to delete this item")) {
    this.api.deleteFpoSalesInfo(id).subscribe(response => {
      this.getFpoSalesInfo();
      this.toastr.success('Sales Info Deleted successfully.');
    },
      err => {
        console.log(err)
      }
    );
  }
}

resetForm(){
  this.salesForm.reset();
}

get formControls(){
  return this.salesForm.controls;
}

}
