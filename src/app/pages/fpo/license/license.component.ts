import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  licenseForm: FormGroup;
  submitted = false;
  licenses:Array<any>=[];
  p:number = 1;
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.licenseForm = this.formBuilder.group({
      licenseType: ['', [Validators.required]],
      licenseIssuedBy: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      issuedDate: ['', [Validators.required]],
      validTill: ['', [Validators.required]],
      id:['']
    });
    this.getLicense();
  }

  getLicense(){
    console.log(sessionStorage.getItem('accessToken'));
    this.api.getLicense().subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
    this.licenses = [
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/02/2020',
        validTill:'23/02/2024',
        id:[4]
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
        id:[5]
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
        id:[6]
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'License 1',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      }
  ];

}

addLicense() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.licenseForm.invalid) {
      return;
  }

  this.api.addLicense(this.licenseForm.value).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

editLicense(license){
  this.licenseForm.setValue(license);
  this.edit = true;
}

updateLicense(license){
  this.api.updateLicense(license).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

confirmDelete(licenseId){
  if(confirm("Are you sure to delete "+name)) {
    this.api.deleteLicense(licenseId).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }
}

resetForm(){
  this.licenseForm.reset();
}

get formControls(){
  return this.licenseForm.controls;
}

}
