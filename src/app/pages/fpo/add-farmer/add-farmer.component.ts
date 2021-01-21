import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../_services/auth/auth.service';
import { FarmerService } from '../../../_services/farmer/farmer.service';

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {

 
  _farmerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  panchayts = [];
  villages = [];
  banks = [];
  farmerDetails = [];
  constructor(private fb: FormBuilder, private _farmerService: FarmerService, private api: AuthService) {
  }

  ngOnInit() {
    this._farmerService.getFarmers().subscribe(f => {
      this.farmerDetails=f
    })
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getBank().subscribe(d => {
      this.banks = d
    })
    this.createRegisterForm();


  }
  selectDistrict(districtId: any) {
    this._farmerForm.controls['distRefId'].setValue(parseInt(districtId.currentTarget.value));
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(block => {
      this.blocks = block
    })
  }
  selectBlock(blockId: any) {
    this.api.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(gp => {
      this.panchayts = gp
    })
    this._farmerForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  }
  selectGramPanchayat(villagePanchayatId: any) {

    this._farmerForm.controls['villagePanchayatId'].setValue(villagePanchayatId.currentTarget.value);
    this.api.getVillage(parseInt(villagePanchayatId.currentTarget.value)).subscribe(v => {
      this.villages = v
    })
  }
  selectVillage(villRefId: any) {
    this._farmerForm.controls['villRefId'].setValue(villRefId.currentTarget.value);
  }
  selectBanks(bankId: any) {
    this._farmerForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createRegisterForm() {
    this._farmerForm = this.fb.group({
      accountNo: [''],
      bankRefId: [''],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      distRefId: ['', Validators.required],
      gender: ['', Validators.required],
      deleted: [true],
      enabled: [true],
      farmerMob: ['', ],
      farmerName: ['', Validators.required],
      ifscCode: [''],
      parantsName: ['',],
      pincode: [''],      
      villRefId: ['', Validators.required],
      villagePanchayatId: ['', Validators.required]   
    })

  }
  get formControls() {
    return this._farmerForm.controls;
  }
  get password() {
    return this._farmerForm.get('password');
  }
  saveFarmer(): Observable<any> {
    this.submitted = true;
    // stop here if form is invalid
    if (this._farmerForm.invalid) {
      return;
    }
    this._farmerForm.value
   //this.api.registerUser(this._farmerForm.value).subscribe(response => {      
   //   console.log(response);
   // },
   //   err => {
   //     console.log(err);        
   //   })
  }
  reset() {
    this.createRegisterForm()
  }
/************************************edit Famer****************************************/
  editFarmer(fd) {
    this._farmerService.getFarmersDetils(fd).subscribe(fd => {
      
    })
  }
}
