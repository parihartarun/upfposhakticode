import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth/auth.service';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

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
  productionReportForm: FormGroup;
  financialYear = [];
  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private authServie: AuthService
  ) { }

  ngOnInit(): void {
    this.authServie.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getCrops().subscribe(c => {
      this.crops = c
    })
    
    this.productionReportForm = this.formBuilder.group({
      districtRefId: [''],
      financial_year: [''],
      season: [''],
      cropRefId: [''],      
      masterId: localStorage.getItem('masterId'),

    });
    fpoId: localStorage.getItem('masterId')
    this.getProduction();
  }

  getProduction() {
    this.production = [
      {
        district:"Agra",
        FpoName: 'food.com',
        fpoAddress: 'pune',
        fpoContact: '8275518800',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        totalFarmers: "12",
        estimatedProduction: '23',
        actualProduction:'12'
      },
      {
        district: "Agra",
        FpoName: 'food.com',
        fpoAddress: 'pune',
        fpoContact: '8275518800',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        totalFarmers: "12",
        estimatedProduction: '23',
        actualProduction: '12'
      },
      {
        district: "Agra",
        FpoName: 'food.com',
        fpoAddress: 'pune',
        fpoContact: '8275518800',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        totalFarmers: "12",
        estimatedProduction: '23',
        actualProduction: '12'
      },
      {
        district: "Agra",
        FpoName: 'food.com',
        fpoAddress: 'pune',
        fpoContact: '8275518800',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        totalFarmers: "12",
        estimatedProduction: '23',
        actualProduction: '12'
      }
    ]
   
  }

  

  get formControls() {
    return this.productionReportForm.controls;
  }
  viewReport() { }
  selectDistrict(districtId: any) {
    this.productionReportForm.controls['districtRefId'].setValue(parseInt(districtId.currentTarget.value));
    
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
    this.productionReportForm.controls['financial_year'].setValue(year.currentTarget.value);
  }

}
