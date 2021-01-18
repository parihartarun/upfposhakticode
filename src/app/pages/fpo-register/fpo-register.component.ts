import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-fpo-register',
  templateUrl: './fpo-register.component.html',
  styleUrls: ['./fpo-register.component.css']
})
export class FpoRegisterComponent implements OnInit {
  fpoRegisterForm: FormGroup;
  submitted= false;
  districts = [
    { district_id: 1, district_name: "mumbai" },
    { district_id: 2, district_name: "pune" },
    { district_id: 3, district_name: "nagpur" },
    { district_id: 4, district_name: "Allhabad" },
    { district_id: 5, district_name: "Delhi" }
  ];
  blocks = [{ district_id: 1, blockName: "mumbai" }];
  panchayts = [{ panchayat_id: 1, panchayat_name: "mumbai1" }];
  agencies = [{ villageId: 1, villageName: "mumbai1" }];
  banks = [{ bankId: 2, bankName: 'sbi', bankNameHi: "abc" }];
  constructor(private fb: FormBuilder, private api: AuthService) { }

  ngOnInit(): void {
    this.createFpoRegisterForm()
  }
  selectDistrict(districtId: any) {
    this.fpoRegisterForm.controls['distRefId'].setValue(districtId.currentTarget.value);
  }
  selectBlock(blockId: any) {
    this.fpoRegisterForm.controls['bankRefId'].setValue(blockId.currentTarget.value);
  }
  selectAgency(districtId: any) {

    console.log(districtId.currentTarget.value);
    this.fpoRegisterForm.controls['agency'].setValue(districtId.currentTarget.value);
  }
  selectBanks(bankId: any) {
    this.fpoRegisterForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createFpoRegisterForm() {
    this.fpoRegisterForm = this.fb.group({
      agency: ['', Validators.required],
      fpoBankAccNo: ['', Validators.required],
      fpoBankName: ['', Validators.required],
      blockRef: ['', Validators.required],
      fpoName: ['', Validators.required],
      distRefId: ['', Validators.required],
      fpoRegistrationNo: ['', Validators.required], 
      deleted: [true],   
      fmbno: ['', Validators.required],
      fpoEmail: ['', Validators.required],
      fpoId: [''],
      fpoIFSC: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      fpoAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]   


    });
  }
  get formControls() {
    return this.fpoRegisterForm.controls;
  }
 
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpoRegisterForm.invalid) {
      return;
    }
    this.fpoRegisterForm.value
    //this.api.registerUser(this.registerForm.value).subscribe(response => {
    //  console.log(response);
    //},
    //  err => {
    //    console.log(err)
    //  })
  }
  


}
