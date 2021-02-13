import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-details-machinery',
  templateUrl: './input-details-machinery.component.html',
  styleUrls: ['./input-details-machinery.component.css']
})
export class InputDetailsMachineryComponent implements OnInit {

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

  ChangingValue(e) {
    console.log(e);

}

}