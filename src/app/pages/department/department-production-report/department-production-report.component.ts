import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-department-production-report',
  templateUrl: './department-production-report.component.html',
  styleUrls: ['./department-production-report.component.css']
})
export class DepartmentProductionReportComponent implements OnInit {


  submitted = false;
  production: Array<any> = [];
  p: number = 1;
  districts = [];
  crops = [];
  seasons= [];
  reportData;
  stateID = 9;

  productionReportForm: FormGroup;
  financialYear = [];
  constructor(
    private formBuilder: FormBuilder, 
    private api: DepartmentService,
    private route: Router,
    private authServie: AuthService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.authServie.getDistrictBystateId(this.stateID).subscribe(d => {
      this.districts = d
    });

    this.api.getSeason().subscribe(s=>{
      this.seasons = s;
    });

    this.productionReportForm = this.formBuilder.group({
      finYear: ['',Validators.required],
      distId: ['',Validators.required],
      cropId: ['', Validators.required],
      seasonId: ['', Validators.required]
      // masterId: localStorage.getItem('masterId'),

    });
    fpoId: localStorage.getItem('masterId')
    // this.getProduction();
  }

  get formControls() {
    return this.productionReportForm.controls;
  }

  viewReport() { 
    this.api.departViewReport(this.productionReportForm.value).subscribe(resp =>{
      if(resp<=0){
        this.toastr.error('data not available.');
      }
      this.reportData = resp;

    });
  }

  selectDistrict(districtId: any) {
    this.productionReportForm.controls['distId'].setValue(parseInt(districtId.currentTarget.value));
    
  }
  getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
    console.log("fiscalyear", fiscalyear)
    return fiscalyear
  }
  selectFinancialYear(year) {
    this.productionReportForm.controls['finYear'].setValue(year.currentTarget.value);
  }
  selectCrops(crop){
    this.productionReportForm.controls['cropId'].setValue(crop.currentTarget.value);
  }

  seasonIDD;
  selectSeason(e){;
    this.seasonIDD =  e.target.value;
    this.api.getCrops(this.seasonIDD).subscribe(c => {
      this.crops = c;
    });
  }

  

}
