import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-details-insecticides',
  templateUrl: './input-details-insecticides.component.html',
  styleUrls: ['./input-details-insecticides.component.css']
})
export class InputDetailsInsecticidesComponent implements OnInit {

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
