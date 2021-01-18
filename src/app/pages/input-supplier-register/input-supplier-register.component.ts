import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/constomMatchValidor';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-input-supplier-register',
  templateUrl: './input-supplier-register.component.html',
  styleUrls: ['./input-supplier-register.component.css']
})
export class InputSupplierRegisterComponent implements OnInit {

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
    
      blockRefId: ['', Validators.required],
      inputSupplierName: ['', Validators.required],
      inputSupplierId: [''],
      inputSupplierType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      license_number: ['', Validators.required],
      districtRefId: ['', Validators.required],
      deleted: [true],
      email: ['', Validators.required],
      gstNumber: ['', Validators.required],     
      mobile_number: ['', Validators.required],
      pincode: ['', Validators.required],
      seed_id: ['', Validators.required],
      villageRefId: ['', Validators.required],
      userName: ['', Validators.required],     
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
