import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/constomMatchValidor';
import { AuthService } from '../../_services/auth/auth.service';


@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrls: ['./farmer-register.component.css']
})
export class FarmerRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [
    { district_id: 1, district_name: "mumbai" },
    { district_id: 2, district_name: "pune" },
    { district_id: 3, district_name: "nagpur" },
    { district_id: 4, district_name: "Allhabad" },
    { district_id: 5, district_name: "Delhi" }
  ];
  blocks = [{ district_id: 1, blockName: "mumbai" }];
  panchayts = [{ panchayat_id: 1, panchayat_name: "mumbai1" }];
  villages = [{ villageId: 1, villageName: "mumbai1" }];
  banks = [{ bankId: 2, bankName: 'sbi', bankNameHi: "abc" }];
  constructor(private fb: FormBuilder, private api: AuthService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      d
    }
    )
    this.createRegisterForm();


  }
  selectDistrict(districtId: any) {   
    this.registerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
  }
  selectBlock(blockId: any) {    
    this.registerForm.controls['bankRefId'].setValue(blockId.currentTarget.value);
  }
  selectGramPanchayat(gramPanchayatId: any) {    
    this.registerForm.controls['villagePanchayatId'].setValue(gramPanchayatId.currentTarget.value);
  }
  selectVillage(villRefId: any) {
    this.registerForm.controls['villRefId'].setValue(villRefId.currentTarget.value);
  }
  selectBanks(bankId: any) {
    this.registerForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      accountNo: ['', Validators.required],
      bankRefId: ['', Validators.required],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      distRefId: ['', Validators.required],
      gender: ['', Validators.required],
      deleted: [true],
      enabled: [true],
      farmerMob: ['', Validators.required],
      farmerName: ['', Validators.required],
      farmerId: ['', Validators.required],  
      ifscCode: ['', Validators.required],
      parantsName: ['', Validators.required],
      pincode: ['', Validators.required],
      userName: ['', Validators.required],
      userRefId: ['', Validators.required],
      villRefId: ['', Validators.required],
      villagePanchayatId: ['', Validators.required],
      recaptcha: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword'),
       
    })



  }
  get formControls() {
    return this.registerForm.controls;
  }
  get password() {
    return this.registerForm.get('password');
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


  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }
}
