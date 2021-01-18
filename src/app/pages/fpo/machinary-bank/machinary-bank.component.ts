import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-machinary-bank',
  templateUrl: './machinary-bank.component.html',
  styleUrls: ['./machinary-bank.component.css']
})
export class MachinaryBankComponent implements OnInit {

  machinaryBankForm: FormGroup;
  submitted = false;
  equipments:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.machinaryBankForm = this.formBuilder.group({
      equipName: ['', [Validators.required]],
      equipNumber: ['', [Validators.required]],
    });
    this.getMachinaryBanks();
  }

  getMachinaryBanks(){
    this.equipments = [
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },{ 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      },
      { 
        equipName:'tractor',
        equipNumber:'21',
      }

  ]
}

addBoardMember() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.machinaryBankForm.invalid) {
      return;
  }

  this.api.addBoardMember(this.machinaryBankForm.value).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

get formControls(){
  return this.machinaryBankForm.controls;
}


}
