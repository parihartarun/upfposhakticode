import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { ExcelService } from '../../../_services/Excel/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    private common:CommonService,
    private excelService:ExcelService
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

  exportAsXLSX(data):void {
    console.log(data);
    var production = [];
    data.forEach( (element) => {
      var obj = {
        'Farmer Name' : element.farmer_name,
        'Father/Husband Name' : element.father_husband_name,
        'Season Name' : element.season_name,
        'Crop Name' : element.crop_name,
        'Crop Variety' : element.crop_veriety,
        'Marketable Surplus' : element.marketable_surplus
      }
      production.push(obj);
    });
    this.excelService.exportAsExcelFile(production, 'Farmer-wise_Production_Report');
  }

  createPdf(data) {
    var production = [];

    var headers = [['Farmer Name', 'Father/Husband Name', 'Season Name', 'Crop Name', 'Crop Variety', 'Marketable Surplus']]
    data.forEach( (element) => {
      var arr = [element.farmer_name, 
        element.father_husband_name,
        element.season_name,
        element.crop_name,
        element.crop_veriety,
        element.marketable_surplus
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
    doc.save('Farmer-wise_Production_Report.pdf');
  }

}
