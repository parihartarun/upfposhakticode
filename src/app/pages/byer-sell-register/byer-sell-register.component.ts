import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/constomMatchValidor';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-byer-sell-register',
  templateUrl: './byer-sell-register.component.html',
  styleUrls: ['./byer-sell-register.component.css']
})
export class ByerSellRegisterComponent implements OnInit {
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
   
    this.createRegisterForm();


  }
  selectDistrict(districtId: any) {

    console.log(districtId.currentTarget.value);
    this.registerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      area: ['', Validators.required],
      buildingName: ['', Validators.required],
      buyerSellerId: [''],
      buyerSellerName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      designationContactPerson: ['', Validators.required],
      districtRefId: ['', Validators.required],
      deleted: [true],     
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      pincode: ['', Validators.required],
      ifscCode: ['', Validators.required],
    
      stateRefId: ['', Validators.required],
      userName: ['', Validators.required],
      streetName: ['', Validators.required],
      webSite: [''], 
      password: ['', Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{6}')],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
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



}
