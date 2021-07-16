import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ChcFmbService } from "src/app/_services/chc_fmb/chc-fmb.service";

@Component({
  selector: 'app-chcfmb-profile',
  templateUrl: './chcfmb-profile.component.html',
  styleUrls: ['./chcfmb-profile.component.css']
})
export class ChcfmbProfileComponent implements OnInit {

  chcprofileForm: FormGroup;
  submitted = false;
  districts = [];
  blocks = [];
  villages = [];
  userId: any;
  profileData: any;
  chcFmbType = 'chc';
  constructor(
    private fb: FormBuilder, 
    private api: AuthService, 
    private _router: Router, 
    private toastr: ToastrService,
    private chcService: ChcFmbService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d;
      
    })
    this.userId=localStorage.getItem('masterId');
    this.chcprofileForm = this.fb.group({
      chcFmbName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      distRefId: ['', Validators.required],
      blockRefId: ['', Validators.required],
      villageRefId: ['', Validators.required],
      contactPerson: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      firmRegistraionNumber: ['', Validators.required],
      allotmentNo: [''],
      shopEstablishmentNumber: [''],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      chcFmbId: []
    });
    this.getUserData();
    
  }

  getUserData(){
    this.chcService.getUserDetails(this.userId).subscribe(data=>{ 
      console.log(data.chcFmb);
      this.profileData = data.chcFmb;
      if(this.profileData.chcFmbType != null){
        this.chcFmbType = this.profileData.chcFmbType;
      }
      
     this.api.getBlock(parseInt(this.profileData.district_id)).subscribe(block => {
        this.blocks = block;
        
      })
      this.api.getVillageByBlock(parseInt(this.profileData.block_id)).subscribe(v => {
        this.villages = v;
      })
      this.chcprofileForm.patchValue({
        chcFmbName:this.profileData.chc_fmb_name,
        email: this.profileData.email,
        distRefId: this.profileData.district_id,
        blockRefId: this.profileData.block_id,
        villageRefId:this.profileData.village_id,
        contactPerson: this.profileData.contactPerson, 
        mobileNumber: this.profileData.mobile_number,
        pincode: this.profileData.pincode,
        firmRegistraionNumber: this.profileData.firm_registraion_number ,
        allotmentNo: this.profileData.allotment_no,
        shopEstablishmentNumber: this.profileData.shop_establishment_number,
        userName: this.profileData.user_name,
        chcFmbId: this.profileData.chc_fmb_id
      })
    })
  }

  selectDistrict(districtId: any) {
    this.chcprofileForm.controls['distRefId'].setValue(districtId.currentTarget.value);
    this.api.getBlock(parseInt(districtId.currentTarget.value)).subscribe(blocks => {
      this.blocks = blocks;
    })
  }
  selectBlock(blockId: any) {
    this.chcprofileForm.controls['blockRefId'].setValue(blockId.currentTarget.value);
    this.api.getVillageByBlock(parseInt(blockId.currentTarget.value)).subscribe(v => {
      this.villages = v;
    })

  }
  selectVillage(villRefId: any) {
    this.chcprofileForm.controls['villageRefId'].setValue(villRefId.currentTarget.value);
  }
  
  get formControls() {
    return this.chcprofileForm.controls;
  }

  updateProfile() {
    this.submitted = true;
    console.log(this.chcprofileForm);
    if (this.chcprofileForm.invalid) {
      return;
    }
    let famerCHCFmb = this.chcprofileForm.value;
    this.chcService.updateChcProfile(famerCHCFmb).subscribe(response => {
      if(response.chcFmbId != ''){        
        this.submitted = false;
        this.toastr.success('Profile Updated successfully.');
      }else{
          this.toastr.error('Error! While Updating Profile.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

}
