import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';


@Component({
  selector: 'app-fpo-register',
  templateUrl: './fpo-register.component.html',
  styleUrls: ['./fpo-register.component.css']
})
export class FpoRegisterComponent implements OnInit {
  fpoRegisterForm: FormGroup;
  submitted= false;
  districts = [   
  ];
  blocks = [{ district_id: 1, blockName: "mumbai" }];
  panchayts = [{ panchayat_id: 1, panchayat_name: "mumbai1" }];
  agencies = [{ villageId: 1, villageName: "mumbai1" }];
  banks = [{ bankId: 2, bankName: 'sbi', bankNameHi: "abc" }];
  constructor(private fb: FormBuilder, private api: AuthService) { }

  ngOnInit(): void {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.createFpoRegisterForm()
  }
  selectDistrict(districtId: any) {
    this.fpoRegisterForm.controls['distRefId'].setValue(districtId.currentTarget.value);
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(block => {
      this.blocks = block
    })
  }
  selectBlock(blockId: any) {
    this.fpoRegisterForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  }
  selectAgency(districtId: any) {   
    this.fpoRegisterForm.controls['agency'].setValue(districtId.currentTarget.value);
  }
  selectBanks(bankId: any) {
    this.fpoRegisterForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createFpoRegisterForm() {
    this.fpoRegisterForm = this.fb.group({
      agency: ['', Validators.required],
      fpoBankAccNo: ['', Validators.required],
      fpoBankName: ['', Validators.required],
      blockRef: ['', Validators.required],
      fpoName: ['', Validators.required],
      distRefId: ['', Validators.required],
      fpoRegistrationNo: ['', Validators.required], 
      deleted: [true],   
      fmbno: ['', Validators.required],
      fpoEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      
      fpoIFSC: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      fpoAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      userName: ['', Validators.required],
      recaptcha: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }
  get formControls() {
    return this.fpoRegisterForm.controls;
  }
 
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpoRegisterForm.invalid) {
      return;
    }
    this.fpoRegisterForm.value
    this.api.registerFPO(this.fpoRegisterForm.value).subscribe(response => {
     console.log(response);
    },
     err => {
       console.log(err)
      })
  }
  

  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }

}
