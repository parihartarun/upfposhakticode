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
submitted = false;
constructor(private formBuilder: FormBuilder,
    private api: FpoService,
    private authservice:AuthService,
    private route: Router,
    private toastr:ToastrService)
    { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      fpoEmail: ['', [Validators.required]],
      fpoName: ['', [Validators.required]],
      fmbno: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      fpoAddress: ['', [Validators.required]],
      distRefId: ['', [Validators.required]],
      blockRef: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      fpoBankName: [''],
      fpoIFSC: [''],
      fpoBankAccNo: [''],
      fpoId: [''],
    });

    this.usernamestring=localStorage.getItem('username');
    this.api.getFpoProfileByUsername(localStorage.getItem('username')).subscribe(data=>{ 
      console.log(data);
        this.profileForm.get("username").setValue(data.userName);
        this.profileForm.get("fpoEmail").setValue(data.fpoEmail);
        this.profileForm.get("fpoName").setValue(data.fpoName);
        this.profileForm.get("fmbno").setValue(data.fmbno);
        this.profileForm.get("agency").setValue(data.agency);
        this.profileForm.get("fpoAddress").setValue(data.fpoAddress);
        this.profileForm.get("distRefId").setValue(data.distRefId);
        this.profileForm.get("blockRef").setValue(data.blockRef);
        this.profileForm.get("pincode").setValue(data.pincode);
        this.profileForm.get("fpoBankName").setValue(data.fpoBankName);
        this.profileForm.get("fpoIFSC").setValue(data.fpoIFSC);
        this.profileForm.get("fpoBankAccNo").setValue(data.fpoBankAccNo);
        this.profileForm.get("fpoId").setValue(data.fpoId);
    })
    this.getDitricts();
    this.getBlocks();
  }

  getDitricts(){
    this.api.getDistricts().subscribe(data => {
        this.districtlist  = data; 
    })
  }

  getBlocks() {
    this.api.getBlocks().subscribe(data => {    
      this.blocklist = data;
    });
  }

  updateProfile(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }
    console.log(this.profileForm.value.username);
    var data = this.profileForm.value;
    var username = this.profileForm.value.username;
    delete data.username;
    data['userFpo'] = {userName:username};
    console.log(data);
    this.api.updateProfile(data).subscribe(response => {
      console.log(response);
      if(response.id != ''){
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
