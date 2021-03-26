import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


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
  equipmentList:Array<any>=[];

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.machinaryBankForm = this.formBuilder.group({
      equpment_name: ['', [Validators.required]],
      equpment_no: ['', [Validators.required, Validators.min(1)]],
      id: [''],
      masterId:localStorage.getItem('masterId')
    });
    this.getMachinaryBanks();
    this.getEquipments();
  }

  getEquipments(){
    this.api.getEquipments().subscribe(response => {
      console.log(response);
      this.equipmentList = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  getMachinaryBanks(){
    console.log(localStorage.getItem('masterId'));
    this.api.getMachinaryBanks(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.equipments = response;
    },
      err => {
        console.log(err)
      }
    );
  }

addMachinaryBank() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.machinaryBankForm.invalid) {
      return;
  }

  this.machinaryBankForm.patchValue({
    masterId:localStorage.getItem('masterId')
  });  
  this.api.addMachinaryBank(this.machinaryBankForm.value).subscribe(response => {
    console.log(response);
    if(response.id != ''){
      this.toastr.success('Machinary bank added successfully.');
      this.submitted = false;
      this.machinaryBankForm.reset();
      this.getMachinaryBanks();
    }else{
        this.toastr.error('Error! While adding Machinary Bank.');
    }
  },
    err => {
      console.log(err)
    }
  );
}

editMachinaryBank(equipment){
  this.machinaryBankForm = this.formBuilder.group({
    equpment_name: [equipment.equpment_name, [Validators.required]],
    equpment_no: [equipment.equpment_no, [Validators.required]],
    id:[equipment.id],
    masterId:localStorage.getItem('masterId')
  });
  this.edit = true;
  window.scroll(0,0);  
}

updateMachinaryBank(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.machinaryBankForm.invalid) {
      return;
  }
  this.api.updateMachinaryBank(this.machinaryBankForm.value).subscribe(response => {
    console.log(response);
    if(response.id != ''){
      this.toastr.success('Machinary bank updated successfully.');
      this.submitted = false;
      this.edit = false;
      this.machinaryBankForm.reset();
      this.getMachinaryBanks();
    }else{
        this.toastr.error('Error! While updating Machinary Bank.');
    }
  },
    err => {
      console.log(err)
    }
  );
}

confirmDelete(equipmentId){
  if(confirm("Are you sure to delete this item.")) {
    this.api.deleteMachinaryBank(equipmentId).subscribe(response => {
      console.log(response);
      if(response == true){
        this.toastr.success('Machinary Bank Deleted successfully.');
        this.getMachinaryBanks();
      }else{
          this.toastr.error('Error! While Deleting Machinary Bank.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }
}

resetForm(){
  this.machinaryBankForm.reset();
  this.submitted = false;
  this.edit = false;
}

get formControls(){
  return this.machinaryBankForm.controls;
}


}
