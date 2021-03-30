import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

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
  FarmerLists:Array<any>=[];
  p:number = 1;  
  edit=false;

  constructor(private fb: FormBuilder, private api: AuthService, private fpo :FpoService ,private _router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getBank().subscribe(d => {
      this.banks = d
    })
    this.createFpoFarmerForm();
    this.getFarmerDetailList();
  }
  
  getFarmerDetailList(){
    this.fpo.getAllFarmerDetails(localStorage.getItem('masterId')).subscribe(
      response => {
      console.log(response);
      this.FarmerLists = response;
      })
  }

  selectDistrict(districtId: any) {
    console.log(districtId);
    if(districtId != null){
      this.fpoAddFarmerForm.controls['distRefId'].setValue(districtId);
      this.api.getBlock(parseInt(districtId)).subscribe(block => {
        console.log(block);
        this.blocks = block
      })
    }
  }
  selectBlock(blockId: any) {
    if(blockId != null){
      this.fpoAddFarmerForm.controls['blockRef'].setValue(blockId);
      this.api.getGramPanchayat(parseInt(blockId)).subscribe(panchayt => {
        console.log(panchayt);

        this.panchayats = panchayt
      })
    }
  }
  selectPanchayat(panchayatId: any) { 
    if(panchayatId != null){
      this.fpoAddFarmerForm.controls['villagePanchayatId'].setValue(panchayatId);
      this.api.getVillage(parseInt(panchayatId)).subscribe(village => {
        console.log(village);
        this.villages = village
      })
    }  
  }

  selectBanks(bankId: any) {
    this.fpoAddFarmerForm.controls['bankRefId'].setValue(bankId.currentTarget.value);
  }
  
  createFpoFarmerForm() {
    this.fpoAddFarmerForm = this.fb.group({
        farmerLotNo:['', Validators.required],
        accountNo : [''],
        bankRefId: [''],
        blockRef:['', Validators.required],
        category: ['', Validators.required],
        distRefId: ['', Validators.required],
        gender: ['', Validators.required],
        createdBy:localStorage.getItem('userrole'),
        enabled: [true],
        farmerMob: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        farmerName: ['', Validators.required],
        ifscCode: [''],
        parantsName: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
        stateref: 0,
        userName: [''],
        userRefId: localStorage.getItem('userId'),
        villRefId: ['', Validators.required],
        villagePanchayatId: ['', Validators.required],
        fpoRefId: localStorage.getItem('masterId'),
        userFar: [],
        farmerId:[''],
        password: ['12345678'],
        confirmPassword: ['12345678']
    }, {
        validator: MustMatch('password', 'confirmPassword')
       
    });

  }
  get formControls() {
    return this.fpoAddFarmerForm.controls;
  }
 
  generate_radom_string() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
  register() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.fpoAddFarmerForm.value);
    if (this.fpoAddFarmerForm.invalid) {
      return;
    }
    this.fpoAddFarmerForm.patchValue({
      fpoRefId: localStorage.getItem('masterId'),
      userRefId: localStorage.getItem('userId'),
      createdBy:localStorage.getItem('userrole')
    });
    let user = {
      userName: this.generate_radom_string(),
      password: 12345678,
      roleRefId:6
    }
    this.fpoAddFarmerForm.value.userFar = user;

    delete this.fpoAddFarmerForm.value.password;
    delete this.fpoAddFarmerForm.value.userName;
    delete this.fpoAddFarmerForm.value.confirmPassword;

    console.log(this.fpoAddFarmerForm.value);
    this.fpo.registerFarmerByFpo(this.fpoAddFarmerForm.value).subscribe(response => {
      console.log(response);
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
        this.fpoAddFarmerForm.reset();
        this.submitted = false;
        this.getFarmerDetailList();
      }
      else {
        this.toastr.error(response.message);
      }
      console.log(response);
    },
      err => {
        console.log(err);
      })
  }
  
  editFarmer(farmerDetails){
    console.log(farmerDetails);
    this.selectDistrict(farmerDetails.distRefId);
    this.selectBlock(farmerDetails.blockRef);
    this.selectPanchayat(farmerDetails.villagePanchayatId);
    this.fpoAddFarmerForm = this.fb.group({
        farmerId:[farmerDetails.farmerId],
        farmerLotNo:[farmerDetails.farmerLotNo],
        accountNo : [farmerDetails.accountNo],
        bankRefId: [farmerDetails.bankRefId],
        blockRef:[farmerDetails.blockRef, Validators.required],
        category: [farmerDetails.category, Validators.required],
        distRefId: [farmerDetails.distRefId, Validators.required],
        gender: [farmerDetails.gender, Validators.required],
        farmerMob: [farmerDetails.farmerMob, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        farmerName: [farmerDetails.farmerName, Validators.required],
        ifscCode: [farmerDetails.ifscCode],
        parantsName: [farmerDetails.parantsName, Validators.required],
        pincode: [farmerDetails.pincode, [Validators.required, Validators.pattern("[0-9 ]{6}")]],        
        userName: [farmerDetails.userName],
        villRefId: [farmerDetails.villRefId, Validators.required],
        villagePanchayatId: [farmerDetails.villagePanchayatId, Validators.required],
        userFar: [farmerDetails.userFar],
        stateref: 0,
        fpoRefId: localStorage.getItem('masterId'),
        userRefId: localStorage.getItem('userId'),
        createdBy:localStorage.getItem('userrole'),
        enabled: [true],
        password: ['12345678'],
        confirmPassword: ['12345678']
    }, {
        validator: MustMatch('password', 'confirmPassword')
       
    });
    setTimeout(()=>{     
      this.fpoAddFarmerForm.patchValue({
        blockRef: farmerDetails.blockRef,
        villagePanchayatId: farmerDetails.villagePanchayatId,
        villRefId:farmerDetails.villRefId
      });
    }, 1000);
    this.edit = true;
    window.scroll(0,0);
  }

  updateFarmerDetails(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpoAddFarmerForm.invalid) {
        return;
    }    
    console.log(this.fpoAddFarmerForm.value);
    this.fpo.updateFarmer(this.fpoAddFarmerForm.value).subscribe(response => {
      if(response.id != ''){
        this.toastr.success('Farmer Detail Updated successfully.');
        this.submitted = false;
        this.edit = false;
        this.fpoAddFarmerForm.reset();
      }else{
          this.toastr.error('Error! While Updating Farmer.');
      }
      this.getFarmerDetailList();
    },
      err => {
        console.log(err)
      }
    );
  }

  confirmDelete(id){
    if(confirm("Are you sure to delete this item.")) {
      this.fpo.deleteFarmer(id).subscribe(response => {
        this.toastr.success('Farmer Deleted successfully.');
        this.getFarmerDetailList();
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  getFarmerDataFromUpAgriPardarshi(){
    console.log(this.fpoAddFarmerForm.value);
    if(this.fpoAddFarmerForm.value.farmerLotNo == ''){
      alert('Please enter Farmer Registration Number');
      return;
    }
    this.api.getFarmerDataFromUpAgriPardarshi(this.fpoAddFarmerForm.value.farmerLotNo).subscribe(response => {
      console.log(response);
      this.selectDistrict(response.districtId);
      this.selectBlock(response.blockId);
      let gender = 'Male';
      if(response.gender == 'F'){
        gender = 'Female';
      }
      this.fpoAddFarmerForm.patchValue({
        farmerName: response.farmerName,
        parantsName: response.fatherName,
        farmerMob:response.mobile,
        category:response.category.toLowerCase(),
        gender:gender,
        distRefId:response.districtId,
        blockRef:response.blockId,
        bankRefId:response.bankId,
        accountNo:response.accountNo,
        ifscCode:response.ifsc
      });

    })
  }

  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }

  resetForm(){
    this.fpoAddFarmerForm.reset();
    this.submitted = false;
    this.edit = false;
  }
}
