import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.css']
})
export class IndentComponent implements OnInit {
  indents: any = [];
  p: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.getIdent()
  }
  getIdent() {
    this.indents = [{
      id: 1,
      fullName: "Vishal patil",
      emailAddress: "v@gmail.com",
      quantityRequired: "120",
      fulfilledDate:"12/02/1990"
    },
      {
        id: 1,
        fullName: "Niraj patil",
        emailAddress: "n@gmail.com",
        quantityRequired: "120",
        fulfilledDate: "12/02/1990"
      },
      {
        id: 1,
        fullName: "Vishal patil",
        emailAddress: "v@gmail.com",
        quantityRequired: "120",
        fulfilledDate: "12/02/1990"
      },
      {
        id: 1,
        fullName: "Vishal patil",
        emailAddress: "v@gmail.com",
        quantityRequired: "120",
        fulfilledDate: "12/02/1990"
      }]
  }
}
