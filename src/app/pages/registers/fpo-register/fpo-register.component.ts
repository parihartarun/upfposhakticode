import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';


@Component({
  selector: 'app-fpo-register',
  templateUrl: './fpo-register.component.html',
  styleUrls: ['./fpo-register.component.css']
})
export class FpoRegisterComponent implements OnInit {
  fpoRegisterForm: FormGroup;
  submitted = false;
  districts = [
  ];
  blocks = [{ district_id: 1, blockName: "mumbai" }];
  panchayts = [{ panchayat_id: 1, panchayat_name: "mumbai1" }];
  agencies = [{ villageId: 1, villageName: "mumbai1" }];
  banks = [];
  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getBank().subscribe(d => {
      this.banks = d
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
    this.fpoRegisterForm.controls['fpoBankName'].setValue(bankId.currentTarget.value);
  }
  createFpoRegisterForm() {
    this.fpoRegisterForm = this.fb.group({
      agency: ['', Validators.required],
      fpoBankAccNo: [''],
      fpoBankName: [''],
      blockRef: ['', Validators.required],
      fpoName: ['', [Validators.required]],
      distRefId: ['', Validators.required],
      fpoRegistrationNo: ['', [Validators.required,Validators.pattern("[0-9a-zA-Z]{1,30}")]],
      deleted: [true],
      fpolandLine: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      fpoEmail: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      fpoIFSC: [''],
      dateOfRegistration: ['', Validators.required],
      fpoAddress: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      userName: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,20}")]],
      recaptcha: ['', Validators.required],
      userFpo: [],
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
    console.log('this.formControls',this.formControls);
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpoRegisterForm.invalid) {
      return;
    }
    let user = {
      userName: this.fpoRegisterForm.value.userName,
      password: this.fpoRegisterForm.value.password,
      roleRefId: 4
    }
    this.fpoRegisterForm.value.userFpo = user;

    delete this.fpoRegisterForm.value.password;
    delete this.fpoRegisterForm.value.userName;
    delete this.fpoRegisterForm.value.confirmPassword;
    let date = new Date(this.fpoRegisterForm.value.dateOfRegistration);
    //let newdate = this.newUYDate(date);
    this.fpoRegisterForm.value.dateOfRegistration = this.datePipe.transform(date, 'dd/MM/yyyy'); //whatever format you need. 
    this.api.registerFPO(this.fpoRegisterForm.value).subscribe(response => {

      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
        this.fpoRegisterForm.reset();
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
  newUYDate(pDate) {
    let dd = pDate.split("/")[0].padStart(2, "0");
    let mm = pDate.split("/")[1].padStart(2, "0");
    let yyyy = pDate.split("/")[2].split(" ")[0];
    let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
    let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
    let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");

    mm = (parseInt(mm) - 1).toString(); // January is 0

    return new Date(dd - mm - yyyy);
  }

}
