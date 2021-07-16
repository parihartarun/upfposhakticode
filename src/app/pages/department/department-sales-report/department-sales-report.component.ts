import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { ExcelService } from '../../../_services/Excel/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  finYears:[];
  stateID = 9;
  salesReport;
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };

  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private common: CommonService,
    private toastr: ToastrService,
    private excelService:ExcelService
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
    this.getFinancialYears();
  }

  filterProduction() {
    // this.getProduction();
  }

  get formControls() {
    return this.filterForm.controls;
  }

  getFinancialYears(){
    this.common.getFinancialYears().subscribe(response => {
      console.log(response);
      this.finYears = response;
      this.filterForm.controls['finYear'].setValue(response[0]);
    },
      err => {
        console.log(err)
      }
    );
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

  exportAsXLSX(data):void {
    var sales = [];
    data.forEach( (element) => {
      var obj = {
        'FPO Name' : element.fpo_name,
        'District Name' : element.district_name,
        'Crop Name' : element.crop_name,
        'Crop Variety' : element.crop_veriety,
        'Sold Quantity' : element.sold_quantity
      }
      sales.push(obj);
    });
    this.excelService.exportAsExcelFile(sales, 'Sales_Report');
  }

  createPdf(data) {
    var sales = [];

    var headers = [['FPO Name', 'District Name', 'Crop Name', 'Crop Variety', 'Sold Quantity']]
    data.forEach( (element) => {
      var arr = [element.fpo_name, 
        element.district_name,
        element.crop_name,
        element.crop_veriety,
        element.sold_quantity
      ]
      sales.push(arr);
    });

    var doc = new jsPDF();

    doc.setFontSize(10);
    //doc.text('Production Report', 11, 8);
    doc.setFontSize(8);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: headers,
      body: sales,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    //doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('sales_report.pdf');
  }

}
