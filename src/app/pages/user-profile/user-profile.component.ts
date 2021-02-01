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
    this.getDitricts();
    this.getBlocks();

    this.usernamestring=localStorage.getItem('userName');
    this.api.getFpoProfileByUsername(localStorage.getItem('username')).subscribe(data=>{ 
      console.log(data);
      this.profileForm = this.formBuilder.group({
        distRefId: [data.distRefId, [Validators.required]],
        blockRef: [data.blockRef, [Validators.required]],
        pincode: [data.pincode, [Validators.required]],
        userName: [data.userName, [Validators.required]],
        agency: [data.agency, [Validators.required]],
        fpoEmail: [data.fpoEmail, [Validators.required]],
        fpoIFSC: [data.fpoIFSC],
        fpoBankAccNo: [data.fpoBankAccNo],
        fpoId: [data.fpoId],
        fpoName: [data.fpoName, [Validators.required]],
        fmbno: [data.fmbno, [Validators.required]],
        fpoAddress: [data.fpoAddress, [Validators.required]],
        fpoBankName: [data.fpoBankName]
      });
    })
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
    var data = this.profileForm.value;
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

  get formControls(){
    return this.profileForm.controls;
  }

}
