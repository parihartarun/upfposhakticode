import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';

@Component({
  selector: 'app-production-report',
  templateUrl: './production-report.component.html',
  styleUrls: ['./production-report.component.css']
})
export class ProductionReportComponent implements OnInit {
  filterForm: FormGroup;
  submitted = false;
  production:Array<any>=[];
  seasons:Array<any>=[];
  currentPage:number = 1;
  finYears:[];

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private common:CommonService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      finYear: [''],
      seasonId: [0],
      fpoId:[localStorage.getItem('masterId')]
    });
    this.getSeasonList();
    this.getFinancialYears();
  }

  getFinancialYears(){
    this.common.getFinancialYears().subscribe(response => {
      console.log(response);
      this.finYears = response;
      this.filterForm = this.formBuilder.group({
        finYear: [response[0]],
        seasonId: [0],
        fpoId:[localStorage.getItem('masterId')]
      });
      this.getFarmerWiseProductionReport();
    },
      err => {
        console.log(err)
      }
    );
  }

  getSeasonList(){
    this.api.getSeasonList().subscribe(
      response => {
      console.log(response);
      this.seasons = response;
    })
  }

  getFarmerWiseProductionReport(){
    console.log(this.filterForm.value);
    this.api.getFarmerWiseProductionReport(this.filterForm.value).subscribe(response => {
      console.log(response);
      this.production = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  exportProductionReport(fileFormat) {
    this.api.exportProductionReport(fileFormat).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
    this.getFarmerWiseProductionReport();
  }

  get formControls(){
    return this.filterForm.controls;
  }

}
