import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputSupplierService } from '../../../../_services/InputSupplier/InputSupplier.services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {

  user_id:number;
  user_data:any;
  seeds=[];
  machinaries=[];
  fertilizers=[];
  insectices=[];
  currentPage = 1;

  constructor(private api:InputSupplierService, 
    private _activatedroute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(param => {
      this.user_id = param.id;
      console.log(this.user_id);
      this.getUserDetails();
    });
  }

  getUserDetails(){
    console.log(this.user_id);
    this.api.getSupplierProfileData(this.user_id).subscribe(response => {
      console.log(response);
      this.user_data = response.inputSupplier;
      this.seeds = response.seed;
      this.fertilizers = response.fertilizer;
      this.insectices = response.insecticides;
      this.machinaries = response.machinerys;
    })
  }

  goBack(){
    this.location.back();
  }

}
