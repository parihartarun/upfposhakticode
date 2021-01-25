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

constructor(private formBuilder: FormBuilder,
    private api: FpoService,
    private authservice:AuthService,
    private route: Router,
    private toastr:ToastrService)
    { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      registrationnumber: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      block: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      bankname: ['', [Validators.required]],
      ifsccode: ['', [Validators.required]],
      aboutme: ['', [Validators.required]],
      bankaccountnumber: ['', [Validators.required]],
    });

this.usernamestring=localStorage.getItem('username');
this.api.getFpoProfileByUsername(localStorage.getItem('username')).subscribe(data=>{ 
  console.log(JSON.stringify(data));
this.profileForm.get("username").setValue(data.userName);
this.profileForm.get("email").setValue(data.fpoEmail);
this.profileForm.get("fullname").setValue(data.fpoName);
this.profileForm.get("registrationnumber").setValue(data.fmbno);
this.profileForm.get("agency").setValue(data.agency);
this.profileForm.get("address").setValue(data.fpoAddress);
this.profileForm.get("district").setValue(data.distRefId);
this.profileForm.get("block").setValue(data.blockRef);
this.profileForm.get("pincode").setValue(data.pincode);
this.profileForm.get("bankname").setValue(data.fpoBankName);
this.profileForm.get("ifsccode").setValue(data.fpoIFSC);
this.profileForm.get("aboutme").setValue("");
this.profileForm.get("bankaccountnumber").setValue(data.fpoBankAccNo);
})




//username   userName
//email  fpoEmail
//Full Name     fpoName
//Registration Number   fmbno
//Agency Associated With   agency
//Address   fpoAddress
//district   distRefId
//block   blockRef
//pincode   pincode
//Bank Name  fpoBankName
// Ifsc code fpoIFSC
//Bank Account Number  fpoBankAccNo
//About me


//===============
// {"fpoId":561,
// "stateref":9,
// "distRefId":118,
// "agency":"sfac",
// "pincode":23232,
// "blockRef":null,
// "fpoName":"Avanta",
// "fpoAddress":"test34",
// "dateOfRegistration":"2021-01-06T09:07:57.000Z",
// "fpolandLine":null,
// "fpoEmail":"avanta@gmail.com",
// "fpoLotNo":null,
// "fpoBankName":null,
// "fpoBankAccNo":null,
// "fpoIFSC":"123e33",
// "userName":"avanta",
// "updateDate":null,
// "createdate":null,
// "fmbno":827,
// "seedprocessingunitno":null,
// "totalfarmers":null,
// "totalbfarmer":null,
// "totalmfarmer":null,
// "totalsfarmer":null,
// "totalland":null,
// "userFpo":{"userId":48,"userName":"avanta",
// "password":"$2a$10$ESzHfnHNmVOunH7I9alyqOiJF1fB/6CoyADbFZ2DONPg6V3sK2ENO",
// "roleRefId":"4",
// "deleteDate":null,
// "dateletedBy":null,
// "activatedBy":null,
// "activateDate":null,
// "deActivatedBy":null,
// "deActivateDate":null,
// "reason":null,
// "enabled":true,
// "deleted":false,
// "changed":true},
// "deleted":false}
  
this.getDitricts();
this.getBlocks();
}


  getDitricts()
  {
    this.api.getDistricts().subscribe(data => {
   this.districtlist  = data; 
   console.log("First value = "+this.blocklist[0].district_name)   
   console.log("Data structure districts = "+JSON.parse(JSON.stringify(data)));    
})
  }
  getBlocks() {
    this.api.getBlocks().subscribe(data => {    
    this.blocklist = data;
    console.log("Data structure blocks = "+data);
    });
  }

  saveInfo(){
    
  }
}
