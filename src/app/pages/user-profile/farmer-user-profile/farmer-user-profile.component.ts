import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FarmerService } from 'src/app/_services/farmer/farmer.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


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
  fpoList = [];
  constructor(private formBuilder: FormBuilder,
    private api: FpoService,
    private authservice: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private farmerService: FarmerService) { }

  ngOnInit(): void {
    this.roleType = localStorage.getItem('userRole');
    this.getDitricts();
    this.authservice.getBank().subscribe(d => {
      this.banks = d
    })

    this.usernamestring = localStorage.getItem('username');
    this.farmerService.getFarmerProfileByUsername(localStorage.getItem('masterId')).subscribe(data => {
      console.log(data);
      this.authservice.getBlock(parseInt(data.distRefId)).subscribe(block => {
        this.blocks = block
      })
      this.authservice.getGramPanchayat(parseInt(data.blockRef)).subscribe(gp => {
        this.panchayts = gp
      })
      this.authservice.getVillage(parseInt(data.villagePanchayatId)).subscribe(v => {
        this.villages = v
      })
      this.createRegisterForm(data);
      this.getALlFpoList();
    })


  }
  getDitricts() {
    this.api.getDistricts().subscribe(data => {
      this.districtlist = data;
    })
  }
  getALlFpoList() {
    this.api.getAllFpo().subscribe(res => {
      if (res) {
        this.fpoList = res;
      }
    });
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
  createRegisterForm(data) {
    this.profileForm = this.formBuilder.group({
      accountNo: [data.accountNo, Validators.required],
      bankRefId: [data.bankRefId, Validators.required],
      blockRef: [data.blockRef, Validators.required],
      category: [data.category, Validators.required],
      distRefId: [data.distRefId, Validators.required],
      gender: [data.gender, Validators.required],
      createdBy: 'ROLE_FARMER',
      deleted: [true],
      enabled: [true],
      farmerId: [data.farmerId],
      farmerMob: [data.farmerMob, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      farmerName: [data.farmerName, Validators.required],
      ifscCode: [data.ifscCode, Validators.required],
      fpoRefId: [data.fpoRefId, Validators.required],
      parantsName: [data.parantsName, Validators.required],
      pincode: [data.pincode, [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      userName: [localStorage.getItem('username'), [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,20}")]],
      userRefId: [data.userRefId],
      villRefId: [data.villRefId, Validators.required],
      villagePanchayatId: [data.villagePanchayatId, Validators.required],


    })



  }

}
