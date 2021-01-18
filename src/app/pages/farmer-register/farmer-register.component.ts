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
    { id: 1, name: "mumbai" },
    { id: 2, name: "pune" },
    { id: 3, name: "nagpur" },
    { id: 4, name: "Allhabad" },
    { id: 5, name: "Delhi" }
  ];
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

    console.log(districtId.currentTarget.value);
    this.registerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
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
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword'),
        recaptcha: ['', Validators.required]
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
