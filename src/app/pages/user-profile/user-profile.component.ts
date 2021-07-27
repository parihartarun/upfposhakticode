import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
profileForm: FormGroup;
usernamestring:string;
districtlist:any=[];
blocklist:any=[];
banks:any=[];
submitted = false;
constructor(private formBuilder: FormBuilder,
    private api: FpoService,
    private auth: AuthService,
    private toastr:ToastrService)
    { }

  ngOnInit() {
    this.getDitricts();
    this.getBanks();
    this.profileForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      fpoEmail: ['', [Validators.required]],
      fpoName: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      fpoAddress: ['', [Validators.required]],
      distRefId: ['', [Validators.required]],
      blockRef: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      fpoBankName: [''],
      fpoIFSC: [''],
      fpoBankAccNo: [''],
      fpoId: [''],

      registeredUnder:[{value: '', disabled: true}],
      fpoRegistrationNo: [{value: '', disabled: true}],
      dateOfRegistration: [{value: '', disabled: true}]
    });

    this.usernamestring=localStorage.getItem('username');
    this.api.getFpoProfileByUsername(localStorage.getItem('username')).subscribe(data=>{ 
      console.log(data);
      this.selectDistrict(data.distRefId);
      this.profileForm = this.formBuilder.group({
        userName: [data.userName, [Validators.required]],
        fpoEmail: [data.fpoEmail, [Validators.required]],
        fpoName: [data.fpoName, [Validators.required]],
        agency: [data.agency, [Validators.required]],
        fpoAddress: [data.fpoAddress, [Validators.required]],
        distRefId: [data.distRefId, [Validators.required]],
        blockRef: [data.blockRef, [Validators.required]],
        pincode: [data.pincode, [Validators.required]],
        fpoBankName: [data.fpoBankName],
        fpoIFSC: [data.fpoIFSC],
        fpoBankAccNo: [data.fpoBankAccNo],
        fpoId: [data.fpoId],

        registeredUnder:[data.registeredUnder],
        fpoRegistrationNo: [data.fpoRegistrationNo],
        dateOfRegistration: [data.dateOfRegistration]
      });
      setTimeout(()=>{  
        this.profileForm.get("blockRef").setValue(data.blockRef);
      }, 1000);
    })
  }

  selectDistrict(districtId: any) {
    console.log(districtId);
    if(districtId != null){
      this.profileForm.controls['distRefId'].setValue(districtId);
      this.auth.getBlock(districtId).subscribe(block => {
        this.blocklist = block
      })
    }
  }

  getBanks(){
      this.auth.getBank().subscribe(d => {
        this.banks = d
      })
  }

  getDitricts(){
    this.api.getDistricts().subscribe(data => {
        this.districtlist  = data; 
    })
  }

  updateProfile(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }
    console.log(this.profileForm.value);
    var data = this.profileForm.value;
    console.log(data);
    this.api.updateProfile(data).subscribe(response => {
      console.log(response);
      if(response.id != ''){
        this.submitted = false;
        this.toastr.success('FPO Profile Updated Successfully.');
      }else{
          this.toastr.error('Error! While Updating Profile.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.profileForm.controls;
  }

}
