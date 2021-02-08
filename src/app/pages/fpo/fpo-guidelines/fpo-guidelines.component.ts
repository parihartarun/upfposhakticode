import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fpo-guidelines',
  templateUrl: './fpo-guidelines.component.html',
  styleUrls: ['./fpo-guidelines.component.css']
})
export class FpoGuidelinesComponent implements OnInit {

  indents: any = [];
  p: number = 1;

  fpoGuideLineFrom: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {
    this.getIdent();
    this.fpoGuideLineFrom = this.formBuilder.group({
      
      isPerRegistration: [false],
      isPostRegistration: [false],
    
      id: ['']
    });  

  }
  getIdent() {
    this.indents = [{
      id: 1,
      fullName: "Vishal patil",
      emailAddress: "v@gmail.com",
      quantityRequired: "120",
      fulfilledDate: "12/02/1990"
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
