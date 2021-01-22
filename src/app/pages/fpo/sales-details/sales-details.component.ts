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
      cropName: ['', [Validators.required]],
      cropVariety: ['', [Validators.required]],
      quantity_sold: ['', [Validators.required]],
      fpoId:localStorage.getItem('masterId'),
      id:['']
    });
    this.getFpoSalesInfo();
  }

  getFpoSalesInfo(){
    this.api.getFpoSalesInfo().subscribe(response => {
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

    this.api.addFpoSalesInfo(this.salesForm.value).subscribe(response => {
      if(response.id != ''){
        this.toastr.success('Sales info added successfully.');
        this.submitted = false;
        this.edit = false;
        this.salesForm.reset();
      }else{
          this.toastr.error('Error! While adding Sales info.');
      }
      this.getFpoSalesInfo();
    },
      err => {
        console.log(err)
      }
    );
  }

  editFpoSalesInfo(sale){
    this.salesForm = this.formBuilder.group({
      season: [sale.season, [Validators.required]],
      cropName: [sale.cropName, [Validators.required]],
      cropVariety: [sale.cropVariety, [Validators.required]],
      quantity_sold: [sale.quantity_sold, [Validators.required]],
      id:[sale.id]
    });
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
    if(response.id != ''){
      this.toastr.success('Sales info Updated successfully.');
      this.submitted = false;
      this.edit = false;
      this.salesForm.reset();
    }else{
        this.toastr.error('Error! While Updating Sales info.');
    }
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
      if(response == true){
        this.toastr.success('Sales Info Deleted successfully.');
      }else{
          this.toastr.error('Error! While Deleting Sales info.');
      }
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
