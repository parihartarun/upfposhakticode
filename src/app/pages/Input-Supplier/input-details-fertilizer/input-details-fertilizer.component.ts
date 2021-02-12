import { Component, OnInit } from '@angular/core';


  @Component({
    selector: 'app-input-details-fertilizer',
    templateUrl: './input-details-fertilizer.component.html',
    styleUrls: ['./input-details-fertilizer.component.css']
})
export class InputDetailsFertilizerComponent implements OnInit {
  fertitype: any;
  subtype:any;
  checked: boolean = false;
  // selected: boolean = false;
  selectedvalue: any;
  chemicalchecked: boolean;
  biochecked: boolean;
  organicchecked: boolean;
 

  constructor() { }

  ngOnInit(): void {

  }

  public fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }


  selectvalue(type) {
    console.log(type);
    this.fertitype = type
  }


  selectedtype(type)
  {
    console.log(type);
    this.subtype = type
  }

  // ChangingValue(e) {
  //   console.log(e)

  //   if (e == 'chemical') {
  //     this.chemicalchecked = true;
  //     this.biochecked = false;
  //     this.organicchecked = false;

  //   }
  //   else if (e == 'bio') {
  //     this.biochecked = true;
  //     this.chemicalchecked = false;
  //     this.organicchecked = false;

  //   } else {
  //     this.organicchecked = true;
  //     this.chemicalchecked = false;
  //     this.biochecked = false;


  //   }

  //   if (e != 'select')
  //     this.selected = true

  // }

  ChangingtypeValue(e)
  {
    console.log(e);
  }

}
