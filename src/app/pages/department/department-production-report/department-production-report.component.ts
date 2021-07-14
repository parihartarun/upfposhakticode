import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { ExcelService } from '../../../_services/Excel/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    private toastr: ToastrService,
    private excelService:ExcelService
  ) { }

  ngOnInit(): void {
    this.authServie.getDistrictBystateId(this.stateID).subscribe(d => {
      this.districts = d
    });

    this.api.getSeason().subscribe(s => {
      this.seasons = s;
    });

    this.productionReportForm = this.formBuilder.group({
      finYear: ['2020-2021', Validators.required],
      distId: ['', Validators.required],
      cropId: ['', Validators.required],
      seasonId: ['', Validators.required]
    });
    // this.getProduction();
    this.getFinancialYears();
    this.viewReport();
  }

  get formControls() {
    return this.productionReportForm.controls;
  }

  viewReport() {
    this.api.departViewReport(this.productionReportForm.value).subscribe(resp => {
      if (resp <= 0) {
        this.toastr.error('data not available.');
      }
      console.log(resp);
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

  exportAsXLSX(data):void {
    console.log(data);
    var production = [];
    data.forEach( (element) => {
      var obj = {
        'FPO Name' : element.fpo_name,
        'FPO Address' : element.fpo_address,
        'FPO Landline' : element.fpo_landline,
        'District Name' : element.district_name,
        'Season Name' : element.seasonName,
        'Crop Name' : element.cropName,
        'Crop Variety' : element.verietyName,
        'Actual Production':element.actualFpoProduction,
        'Marketable Surplus' : element.marketable
      }
      production.push(obj);
    });
    this.excelService.exportAsExcelFile(production, 'Farmer-wise_Production_Report');
  }

  createPdf(data) {
    var production = [];

    var headers = [['FPO Name', 'FPO Address', 'FPO Landline', 'District Name', 'Season Name', 'Crop Name', 'Crop Variety', 'Actual Production', 'Marketable Surplus']]
    data.forEach( (element) => {
      var arr = [element.fpo_name, 
        element.fpo_address,
        element.fpo_landline,
        element.district_name,
        element.seasonName,
        element.cropName,
        element.verietyName,
        element.actualFpoProduction,
        element.marketable
      ]
      production.push(arr);
    });

    var doc = new jsPDF();

    doc.setFontSize(10);
    //doc.text('Production Report', 11, 8);
    doc.setFontSize(8);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: headers,
      body: production,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    //doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('production_report.pdf');
  }

}
