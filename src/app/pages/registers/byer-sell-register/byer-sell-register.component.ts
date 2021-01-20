import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router) {
  }

  ngOnInit() {
    this.api.getState().subscribe(s => {
      this.states = s
    })
    this.createRegisterForm();
  }
  selectState(stateId) {
    this.registerForm.controls['stateRefId'].setValue(stateId.currentTarget.value);
    this.api.getDistrictByState(parseInt(stateId.currentTarget.value)).subscribe(d => {
      this.districts = d
    })
  }
  selectDistrict(districtRefId: any) {   
    this.registerForm.controls['districtRefId'].setValue(districtRefId.currentTarget.value);
    
   
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
      email: ['', [Validators.required, Validators.email]], 
      mobileNumber: ['', Validators.required],
      pincode: ['', Validators.required],
         
      stateRefId: ['', Validators.required],
      userName: ['', Validators.required],
      streetName: ['', Validators.required],
      webSite: [''],
      recaptcha: ['', Validators.required],
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
    this.api.registerBuyerSeller(this.registerForm.value).subscribe(response => {
      alert(response.message);
      if (response.message == "SuccessFully Saved!") {
        this._router.navigate(['/login'])
      }
      console.log(response);
    },
      err => {
        console.log(err);
        alert(err);
      })
  }

  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }

}
