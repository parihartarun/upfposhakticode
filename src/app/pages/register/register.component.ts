import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.register = this.fb.group({
      accountNo: ['', Validators.required],
      agency: ['', Validators.required],
      bankRefId: ['', Validators.required],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      createdBy: ['', Validators.required],
      deleted: [true],
      enabled: [true],
      educationId: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmerAdhaar: ['', Validators.required],
      farmerId: ['', Validators.required],     
      farmerLotNo: ['', Validators.required],
      farmerMob: ['', Validators.required],
      farmerName: ['', Validators.required],
      figRefId: ['', Validators.required],
      fpoRefId: ['', Validators.required],
      ifscCode: ['', Validators.required],
      kccno: ['', Validators.required],
      parantsName: ['', Validators.required],
      pincode: ['', Validators.required],
      registerDate: ['', Validators.required],
      slaRefId: ['', Validators.required],
      stateref: ['', Validators.required],
      upBSMId: ['', Validators.required],
      updateDate: ['', Validators.required],
      updatedBy: ['', Validators.required],
      userName: ['', Validators.required],
      userRefId: ['', Validators.required],
      villRefId: ['', Validators.required],
      villagePanchayatId: ['', Validators.required],
      
});

  }

}
