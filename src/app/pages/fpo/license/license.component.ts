import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

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
  licensesTypes:Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.licenseForm = this.formBuilder.group({
      licenceType: ['', [Validators.required]],
      licenceIssuedBy: ['', [Validators.required]],
      liceneceNumber: ['', [Validators.required]],
      issuedate: ['', [Validators.required]],
      licenceValidTill: ['', [Validators.required]],
      id:['']
    });
    this.getLicense();
    this.getLicenseTypes();
  }

  getLicense(){
      this.api.getLicense().subscribe(response => {
        console.log(response);
        this.licenses = response;
      },
        err => {
          console.log(err)
        }
      );
  }

  getLicenseTypes(){
    this.api.getLicenseTypes().subscribe(response => {
      console.log(response);
      this.licensesTypes = response;
    },
      err => {
        console.log(err)
      }
    );
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
  this.licenseForm = this.formBuilder.group({
    licenceType: [license.licenceType, [Validators.required]],
    licenceIssuedBy: [license.licenceIssuedBy, [Validators.required]],
    liceneceNumber: [license.liceneceNumber, [Validators.required]],
    issuedate: [formatDate(license.issuedate, 'yyyy-MM-dd', 'en'), [Validators.required]],
    licenceValidTill: [formatDate(license.licenceValidTill, 'yyyy-MM-dd', 'en'), [Validators.required]],
    id:[license.id]
  });
  this.edit = true;
}

updateLicense(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.licenseForm.invalid) {
      return;
  }
  this.api.updateLicense(this.licenseForm.value).subscribe(response => {
    this.getLicense();
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
