import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { CommonService } from 'src/app/_services/common/common.service';

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
  seasons = [];
  finYears:[];
  reportData;
  stateID = 9;
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };

  productionReportForm: FormGroup;
  financialYear = [];
  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private common: CommonService,
    private authServie: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authServie.getDistrictBystateId(this.stateID).subscribe(d => {
      this.districts = d
    });

    this.api.getSeason().subscribe(s => {
      this.seasons = s;
    });

    this.productionReportForm = this.formBuilder.group({
      finYear: ['', Validators.required],
      distId: ['', Validators.required],
      cropId: ['', Validators.required],
      seasonId: ['', Validators.required]
    });
    // this.getProduction();
    this.getFinancialYears();
  }

  get formControls() {
    return this.productionReportForm.controls;
  }

  viewReport() {
    this.api.departViewReport(this.productionReportForm.value).subscribe(resp => {
      if (resp <= 0) {
        this.toastr.error('data not available.');
      }
      this.reportData = resp;
    });
  }

  selectDistrict(districtId: any) {
    this.productionReportForm.controls['distId'].setValue(parseInt(districtId.currentTarget.value));
  }

  getFinancialYears(){
    this.common.getFinancialYears().subscribe(response => {
      console.log(response);
      this.finYears = response;
      this.productionReportForm.controls['finYear'].setValue(response[0]);

    },
      err => {
        console.log(err)
      }
    );
  }

  selectFinancialYear(year) {
    this.productionReportForm.controls['finYear'].setValue(year.currentTarget.value);
  }

  selectCrops(crop) {
    this.productionReportForm.controls['cropId'].setValue(crop.currentTarget.value);
  }

  seasonIDD;
  selectSeason(e) {
    this.seasonIDD = e.target.value;
    this.api.getCrops(this.seasonIDD).subscribe(c => {
      this.crops = c;
    });
  }

  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }

}
