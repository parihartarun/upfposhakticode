import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';

@Component({
  selector: 'app-farmer-chc-register',
  templateUrl: './farmer-chc-register.component.html',
  styleUrls: ['./farmer-chc-register.component.css']
})
export class FarmerChcRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  isBulkSupplyingCompany: boolean = true
  constructor(private fb: FormBuilder, private api: AuthService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.createRegisterForm();

  }
  selectDistrict(districtId: any) {
    this.registerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(blocks => {
      this.blocks = blocks;
    })
  }
  selectBlock(blockId: any) {
    this.registerForm.controls['blockRefId'].setValue(blockId.currentTarget.value);

  }
  selectVillage(villRefId: any) {
    this.registerForm.controls['villRefId'].setValue(villRefId.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      allotmentNo: ['', Validators.required],
      blockRefId: ['', Validators.required],     
      chcFmbName: ['', Validators.required],
      contactPerson: ['', Validators.required],      
      distRefId: ['', Validators.required],
      deleted: [true],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      firmRegistraionNumber: ['', Validators.required],
      mobile_number: ['', Validators.required],
      pincode: ['', Validators.required],
      shopEstablishmentNumber: ['', Validators.required],
      villageRefId: ['', Validators.required],
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
