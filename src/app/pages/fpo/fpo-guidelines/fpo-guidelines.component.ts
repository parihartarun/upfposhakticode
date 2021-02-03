import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';

@Component({
  selector: 'app-fpo-guidelines',
  templateUrl: './fpo-guidelines.component.html',
  styleUrls: ['./fpo-guidelines.component.css']
})
export class FpoGuidelinesComponent implements OnInit {
  options = {}
  data = [];
  columns: any = {};

  preFPORegister: boolean = true;
  postFPORegister: boolean = false;

  optionsBasicNoData = {}
  dataBasicNoData = [];
  columnsBasicNoData: any = {}; 
  optionsWithFeatures: any 

  constructor() { }
  ngOnInit(): void {

    this.optionsBasicNoData = {
      emptyDataMessage: 'No data available in table'
    }
    this.dataBasicNoData = [];

    this.columnsBasicNoData = [
      { key: 'serialNo', title: "Serial No" },
      { key: 'description', title: 'Description' },
      { key: 'date', title: 'Date' },
      { key: 'seeInDetails', title: 'See In Details' }
    ]

    this.optionsWithFeatures = {
      rowClickEvent: true,
      rowPerPageMenu: [5, 10, 20, 30],
      rowPerPage: 5
    }

  }

  onPreFPORegister() {
    this.postFPORegister = false;
    this.preFPORegister = true;
  }

  onPostFPORegister() {
    this.postFPORegister = true;
    this.preFPORegister = false;
  }


}
