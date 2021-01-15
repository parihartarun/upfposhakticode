import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private fb: FormBuilder, private api: AuthService,) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      accountNo: ['', Validators.required],
      agency: ['', Validators.required],
      bankRefId: ['', Validators.required],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      createdBy: ['', Validators.required],
      distRefId: ['', Validators.required],
      distanceFromFpc: ['', Validators.required],
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
      gender: ['', Validators.required],
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
  get formControls() {
    return this.registerForm.controls;
  }
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value
    //this.api.registerUser(this.registerForm.value).subscribe(response => {
    //  console.log(response);
    //},
    //  err => {
    //    console.log(err)
    //  })
  }

}
