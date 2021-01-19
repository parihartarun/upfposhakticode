import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';

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
  districts = [];
  blocks = [];
  villages = [];
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  isBulkSupplyingCompany: boolean=true 
  constructor(private fb: FormBuilder, private api: AuthService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.createRegisterForm();

  }
  selectDistrict(districtId: any) {
    this.registerForm.controls['districtRefId'].setValue(districtId.currentTarget.value);
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(blocks => {
      this.blocks = blocks;
    })
  }
  selectBlock(blockId: any) {
    this.registerForm.controls['blockRefId'].setValue(blockId.currentTarget.value);
    
  }
  selectInputSupplierType(inputSupplierType: any) {
    if (parseInt(inputSupplierType.currentTarget.value) == 1) {
      this.isBulkSupplyingCompany = false;
    } else {
      this.isBulkSupplyingCompany = true;
    }
    this.registerForm.controls['inputSupplierType'].setValue(inputSupplierType.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({    
      blockRefId: [''],
      inputSupplierName: ['', Validators.required],
      inputSupplierId: [''],
      inputSupplierType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      license_number: ['', Validators.required],
      districtRefId: ['', ],
      deleted: [true],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gstNumber: ['', Validators.required],     
      mobile_number: ['', Validators.required],
      pincode: ['', Validators.required],
      seed_id: [''],
      villageRefId: [''],
      userName: ['', Validators.required],
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
    //this.api.registerUser(this.registerForm.value).subscribe(response => {
    //  console.log(response);
    //},
    //  err => {
    //    console.log(err)
    //  })
  }



}
