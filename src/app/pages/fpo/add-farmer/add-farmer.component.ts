import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent implements OnInit {

  fpoAddFarmerForm: FormGroup;
  submitted= false;
  //panchayts:Array<any>=[];
  
  districts = [];
  blocks = [];
  panchayats = [];
  villages = [];
  banks = [];
  form: FormGroup;
  constructor(private fb: FormBuilder, private api: AuthService, private fpo :FpoService ,private _router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getBank().subscribe(d => {
      this.banks = d
    })
    this.createFpoFarmerForm();
  }
  
  selectDistrict(districtId: any) {
    this.fpoAddFarmerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(block => {
      this.blocks = block
    })
  }
  selectBlock(blockId: any) {
    this.fpoAddFarmerForm.controls['blockRef'].setValue(blockId.currentTarget.value);
    this.api.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(panchayt => {
      this.panchayats = panchayt
    })
  }
  selectPanchayat(panchayatId: any) {   
    this.fpoAddFarmerForm.controls['villagePanchayatId'].setValue(panchayatId.currentTarget.value);
    this.api.getVillage(parseInt(panchayatId.currentTarget.value)).subscribe(village => {
      this.villages = village
    })
  }

  selectBanks(bankId: any) {
    this.fpoAddFarmerForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  createFpoFarmerForm() {
    this.fpoAddFarmerForm = this.fb.group({
        accountNo : ['', Validators.required],
        bankRefId: ['', Validators.required],
        blockRef:['', Validators.required],
        category: ['', Validators.required],
        distRefId: ['', Validators.required],
        gender: ['', Validators.required],
        createdBy:localStorage.getItem('userrole'),
        deleted: [true],
        enabled: [true],
        farmerMob: 0,
        farmerName: ['', Validators.required],
        ifscCode: ['', Validators.required],
        parantsName: ['', Validators.required],
        pincode: ['', Validators.required],
        stateref: 0,
        userName: ['', Validators.required],
        userRefId: localStorage.getItem('userId'),
        villRefId: ['', Validators.required],
        villagePanchayatId: ['', Validators.required],
        //educationId: 0,
        //farmerId: 0,
        //farmerLotNo:['', Validators.required],
        fpoRefId: localStorage.getItem('masterId'),
        userFar: [],
        password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
       
    });

  }
  get formControls() {
    return this.fpoAddFarmerForm.controls;
  }
 
  register() {
    alert(JSON.stringify(this.fpoAddFarmerForm.value));
    this.submitted = true;
    // stop here if form is invalid
    // if (this.fpoAddFarmerForm.invalid) {
    //   return;
    // }
    let user = {
      userName: this.fpoAddFarmerForm.value.userName,
      password: this.fpoAddFarmerForm.value.password,
      roleRefId:6
    }
    delete this.fpoAddFarmerForm.value.password;
    delete this.fpoAddFarmerForm.value.userName;
    delete this.fpoAddFarmerForm.value.confirmPassword;
  
    this.fpoAddFarmerForm.value.userFar = user;

    console.log("dgdfg "+JSON.stringify(this.fpoAddFarmerForm.value));
    this.fpo.registerFarmerByFpo(this.fpoAddFarmerForm.value).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
        this.fpoAddFarmerForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
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

  // getFarmerLists(){
  //   this.fpoService.getFarmerLists().subscribe(
  //     response => {
  //     console.log(response);
  //     this.landDetails = response;
  //     })
  // }

  resetForm(){
  this.fpoAddFarmerForm.reset();
  }
}
