import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  villages = [];
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  isBulkSupplyingCompany: boolean = true
  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router, private toastr: ToastrService) {
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
    this.api.getVillageByBlock(parseInt(blockId.currentTarget.value)).subscribe(v => {
      this.villages = v;
    })

  }
  selectVillage(villRefId: any) {
    this.registerForm.controls['villageRefId'].setValue(villRefId.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      allotmentNo: ['', Validators.required],
      blockRefId: ['', Validators.required],     
      chcFmbName: ['', Validators.required],
      contactPerson: ['', Validators.required],      
      distRefId: ['', Validators.required],
      deleted: [true],
      email: ['', [Validators.required, Validators.email]],
      firmRegistraionNumber: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      shopEstablishmentNumber: ['', Validators.required],
      villageRefId: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,20}")]],
      recaptcha: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      user: [],
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
    let user = {
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      roleRefId:5
    }
    this.registerForm.value.user = user;
    let famerCHCFmb = {
      allotmentNo: '',
      blockRefId: '',
      chcFmbName: '',
      contactPerson: '',
      deleted: true,
      distRefId: '',
      email: '',
      firmRegistraionNumber: '',
      mobileNumber: '',
      pincode: '',
      recaptcha: '',
      shopEstablishmentNumber: "",
      user: user,     
      villageRefId: '',
    }
    famerCHCFmb.allotmentNo = this.registerForm.value.allotmentNo;
    famerCHCFmb.blockRefId = this.registerForm.value.blockRefId;
    famerCHCFmb.chcFmbName = this.registerForm.value.chcFmbName;
    famerCHCFmb.contactPerson = this.registerForm.value.contactPerson;
    famerCHCFmb.deleted = this.registerForm.value.deleted;
    famerCHCFmb.firmRegistraionNumber = this.registerForm.value.firmRegistraionNumber,
    famerCHCFmb.shopEstablishmentNumber = this.registerForm.value.shopEstablishmentNumber,    
    famerCHCFmb.distRefId = this.registerForm.value.distRefId;
    famerCHCFmb.email = this.registerForm.value.email;
    famerCHCFmb.mobileNumber = this.registerForm.value.mobileNumber;
    famerCHCFmb.pincode = this.registerForm.value.pincode;
    famerCHCFmb.recaptcha = this.registerForm.value.recaptcha;
    famerCHCFmb.user = user;
    famerCHCFmb.villageRefId = this.registerForm.value.villageRefId;
    this.api.registerCHCFmb(famerCHCFmb).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
        this.registerForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
      }
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
