import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';


@Component({
  selector: 'app-farmer-chc-register',
  templateUrl: './farmer-chc-register.component.html',
  styleUrls: ['./farmer-chc-register.component.css']
})
export class FarmerChcRegisterComponent implements OnInit {
  chcFmbName = 'Equipment Centre Name';
  docRadio = 'chc';
  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  villages = [];
  type = 'chc';
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  isBulkSupplyingCompany: boolean = true
  fieldTextType: boolean;
  fieldTextTypeCpwd:boolean;
  invalidUserName:boolean=false;

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
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      firmRegistraionNumber: [''],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      shopEstablishmentNumber: [''],
      villageRefId: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      recaptcha: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      user: [],
      tnc: ['', Validators.required],
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
    if (this.registerForm.invalid || this.invalidUserName == true) {
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
      chcFmbType:''
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
    famerCHCFmb.chcFmbType = this.type;
    console.log(famerCHCFmb);
    this.api.registerCHCFmb(famerCHCFmb).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success('Registration done successfully.');
        this.registerForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
      }
    })
  }
  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeCpwd(){
    this.fieldTextTypeCpwd = !this.fieldTextTypeCpwd;
  }

  validateUserName(userName){
    this.invalidUserName = false;
    this.api.validateUserName(userName).subscribe(response => {
      if(response.status !== "Accepted"){
        this.invalidUserName = true;
      }
    })
  }

  changeType(type){
    if(type == 'fmb'){
      this.chcFmbName = 'SHG/FPO';
      this.type = type;
    }else{
      this.chcFmbName = 'Equipment Centre Name';
      this.type = type;
    }
  }

}
