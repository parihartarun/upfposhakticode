import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';



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
  states = [];
  districts = [];
  blocks = [];
  constructor(private fb: FormBuilder, private api: AuthService) {
  }

  ngOnInit() {
    this.api.getState().subscribe(s => {
      this.states = s
    })
    this.createRegisterForm();
  }
  selectState(stateId) {
    this.registerForm.controls['stateRefId'].setValue(stateId.currentTarget.value);
  }
  selectDistrict(stateId: any) {   
    this.registerForm.controls['districtRefId'].setValue(stateId.currentTarget.value);
    this.api.getDistrictByState(parseInt(stateId.currentTarget.value)).subscribe(d=> {
      this.districts = d
    })
   
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
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
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
