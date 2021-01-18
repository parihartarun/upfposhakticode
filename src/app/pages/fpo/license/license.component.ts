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
      validTill: ['', [Validators.required]]
    });
    this.getLicense();
  }

  getLicense(){
    this.licenses = [
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      },
      { 
        licenseType:'Nursery License',
        licenseIssuedBy:'Vaishali Patil',
        licenseNumber:'JDJD324833',
        issuedDate:'23/20/2020',
        validTill:'23/20/2024',
      }
  ]
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

get formControls(){
  return this.licenseForm.controls;
}


}
