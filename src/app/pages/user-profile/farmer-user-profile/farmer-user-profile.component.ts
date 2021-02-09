import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth/auth.service';
import { FarmerService } from '../../../_services/farmer/farmer.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-farmer-user-profile',
  templateUrl: './farmer-user-profile.component.html',
  styleUrls: ['./farmer-user-profile.component.css']
})
export class FarmerUserProfileComponent implements OnInit {
  roleType: any
  profileForm: FormGroup;
  usernamestring: string;
  districtlist: any = [];
  blocklist: any = [];
  submitted = false;
  blocks = [];
  panchayts = [];
  villages = [];
  banks = [];
  constructor(private formBuilder: FormBuilder,
    private api: FpoService,
    private authservice: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private farmerService: FarmerService) { }

  ngOnInit(): void {
    this.roleType = localStorage.getItem('userRole');
    this.getDitricts();
    
    this.usernamestring = localStorage.getItem('username');
    this.farmerService.getFarmerProfileByUsername(localStorage.getItem('username')).subscribe(data => {
      console.log(data);
     
    })
   
    this.createRegisterForm();
  }
  getDitricts() {
    this.api.getDistricts().subscribe(data => {
      this.districtlist = data;
    })
  }

  selectDistrict(districtId: any) {
    this.profileForm.controls['distRefId'].setValue(parseInt(districtId.currentTarget.value));
    this.authservice.getBlock(parseInt(districtId.currentTarget.value)).subscribe(block => {
      this.blocks = block
    })
  }
  selectBlock(blockId: any) {
    this.authservice.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(gp => {
      this.panchayts = gp
    })
    this.profileForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  }
  selectGramPanchayat(villagePanchayatId: any) {

    this.profileForm.controls['villagePanchayatId'].setValue(villagePanchayatId.currentTarget.value);
    this.authservice.getVillage(parseInt(villagePanchayatId.currentTarget.value)).subscribe(v => {
      this.villages = v
    })
  }

  updateProfile() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    var data = this.profileForm.value;
    console.log(data);
    this.farmerService.updateProfile(data).subscribe(response => {
      console.log(response);
      if (response.id != '') {
        this.submitted = false;
        this.toastr.success('Profile Updated successfully.');
      } else {
        this.toastr.error('Error! While Updating Profile.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls() {
    return this.profileForm.controls;
  }
  createRegisterForm() {
    this.profileForm = this.formBuilder.group({
      accountNo: ['', Validators.required],
      bankRefId: ['', Validators.required],
      blockRef: ['', Validators.required],
      category: ['', Validators.required],
      distRefId: ['', Validators.required],
      gender: ['', Validators.required],
      createdBy: 'ROLE_FARMER',
      deleted: [true],
      enabled: [true],
      farmerId: [],
      farmerMob: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      farmerName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      parantsName: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      userName: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,20}")]],
      userRefId: [''],
      villRefId: ['', Validators.required],
      villagePanchayatId: ['', Validators.required],
     
     
    })



  }
  
}
