import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';


@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrls: ['./farmer-register.component.css']
})
export class FarmerRegisterComponent implements OnInit {
  @Input() selectRegisterForm: string; // decorate the property with @Input()
  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  panchayts = [];
  villages = [];
  banks = [];
  fpoList = [];
  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router,
    private toastr: ToastrService,
    private fpoService: FpoService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getBank().subscribe(d => {
      this.banks = d
    })
    this.createRegisterForm();
    this.getALlFpoList();

  }
  selectDistrict(districtId: any) {
    this.registerForm.controls['distRefId'].setValue(parseInt(districtId.currentTarget.value));
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(block => {
      this.blocks = block
    })
  }
  selectBlock(blockId: any) {
    this.api.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(gp => {
      this.panchayts = gp
    })
    this.registerForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  }
  getALlFpoList() {
    this.fpoService.getAllFpo().subscribe(res => {
      if (res) {
        this.fpoList = res;
      }
    });
  }
  selectGramPanchayat(villagePanchayatId: any) {

    this.registerForm.controls['villagePanchayatId'].setValue(villagePanchayatId.currentTarget.value);
    this.api.getVillage(parseInt(villagePanchayatId.currentTarget.value)).subscribe(v => {
      this.villages = v
    })
  }
  selectVillage(villRefId: any) {
    this.registerForm.controls['villRefId'].setValue(villRefId.currentTarget.value);
  }
  selectBanks(bankId: any) {
    this.registerForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      accountNo: ['', [Validators.pattern("[0-9 ]{11,16}")]],
      bankRefId: [''],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      distRefId: ['', Validators.required],
      gender: ['', Validators.required],
      createdBy: 'ROLE_FARMER',
      deleted: [true],
      enabled: [true],
      farmerMob: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      farmerName: ['', Validators.required],

      ifscCode: [''],
      parantsName: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      userRefId: [''],
      fpoRefId: ['', Validators.required],
      villRefId: ['', Validators.required],
      villagePanchayatId: ['', Validators.required],
      recaptcha: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      userFar: [],
      tnc: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      upBSMId: [""],
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
  register(): Observable<any> {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value

    let user = {
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      roleRefId: 6
    }
    delete this.registerForm.value.password;
    delete this.registerForm.value.userName;
    delete this.registerForm.value.confirmPassword;
    this.registerForm.value.userFar = user;
    //let famerRegister = {
    //  accountNo: '',
    //  bankRefId: '',
    //  blockRef: '',
    //  category: '',
    //  confirmPassword: '',
    //  deleted: true,
    //  distRefId: '',
    //  enabled: true,
    //  farmerMob:'',
    //  farmerName: '',
    //  gender:'',
    //  ifscCode: '',
    //  parantsName: '',
    //   password: '',
    //  pincode: '',
    //  recaptcha:'',
    //  user: user,
    //  userRefId: "",
    //  villRefId: "",
    //  villagePanchayatId: ""
    //}
    //famerRegister.accountNo=

    console.log(JSON.stringify(this.registerForm.value));
    this.api.registerUser(this.registerForm.value).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
        this.registerForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
      }

    })

  }

  getFarmerDataFromUpAgriPardarshi(){
    console.log(this.registerForm.value.upBSMId);
    if(this.registerForm.value.upBSMId == ''){
      alert('Please enter Farmer Registration Number');
      return;
    }
    this.api.getFarmerDataFromUpAgriPardarshi(this.registerForm.value.upBSMId).subscribe(response => {
      console.log(response);
    })
  }

  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }
}
