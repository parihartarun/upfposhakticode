import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';

@Component({
  selector: 'app-department-sales-report',
  templateUrl: './department-sales-report.component.html',
  styleUrls: ['./department-sales-report.component.css']
})
export class DepartmentSalesReportComponent implements OnInit {
  filterForm: FormGroup;
  submitted = false;
  production: Array<any> = [];
  p: number = 1;
  districts = [];
  crops = [];
  seasons = [];
  stateID = 9;
  salesReport;
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };

  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      finYear: ['', Validators.required],
      distId: ['', Validators.required],
      cropId: ['', Validators.required],
      seasonId: ['', Validators.required]
      // masterId: localStorage.getItem('masterId'),

    });
    this.api.getDistrictBystateId(this.stateID).subscribe(d => {
      this.districts = d;
    })


    this.api.getSeason().subscribe(s => {
      this.seasons = s;
    })
  }

  filterProduction() {
    // this.getProduction();
  }

  get formControls() {
    return this.filterForm.controls;
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
    this.filterForm.controls['finYear'].setValue(year.currentTarget.value);
  }

  selectDistrict(districtId: any) {
    this.filterForm.controls['distId'].setValue(parseInt(districtId.currentTarget.value));
  }

  selectCrops(crop) {
    this.filterForm.controls['cropId'].setValue(crop.currentTarget.value);
  }
  seasonIDD
  selectSeason(e) {
    this.seasonIDD = e.target.value;
    this.api.getCropsForSales(this.seasonIDD).subscribe(c => {
      this.crops = c;
    });
  }

  viewReport() {
    this.api.departViewReportSales(this.filterForm.value).subscribe(resp => {
      if (resp <= 0) {
        this.toastr.error('data not available.');
      }
      this.salesReport = resp;
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
