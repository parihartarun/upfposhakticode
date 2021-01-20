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
  equiplist: any;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.machinaryBankForm = this.formBuilder.group({
      equipName: ['', [Validators.required]],
      equipNumber: ['', [Validators.required]],
      id: [''],
    });
    this.getMachinaryBanks();
this.getEquipmentList();
  }

  getMachinaryBanks(){
    this.api.getMachinaryBanks().subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
    this.equipments = [
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
        id:[1]
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'24',
        id:[2]
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
        id:[3]
      },{ 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      },
      { 
        equipName:'Equipment 1',
        equipNumber:'21',
      }

  ]
}
getEquipmentList()
{
  this.api.getEquipList().subscribe(data=>{
  console.log(JSON.stringify(data));  
  this.equiplist = data;
  })
}


addMachinaryBank() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.machinaryBankForm.invalid) {
      return;
  }

  this.api.addMachinaryBank(this.machinaryBankForm.value).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

editMachinaryBank(equipment){
  this.machinaryBankForm.setValue(equipment);
  this.edit = true;
}

updateMachinaryBank(equipment){
  this.api.updateMachinaryBank(equipment).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

confirmDelete(equipmentId){
  if(confirm("Are you sure to delete "+name)) {
    this.api.deleteMachinaryBank(equipmentId).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }
}

resetForm(){
  this.machinaryBankForm.reset();
}

get formControls(){
  return this.machinaryBankForm.controls;
}


}
