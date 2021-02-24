import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.css']
})
export class MachineryComponent implements OnInit {
  formRadio = ''

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

  ChangingValue(e)
  {
     console.log(e);
     this.formRadio=e;
    }
 

}
