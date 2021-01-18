import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceForm: FormGroup;
  submitted = false;
  services:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      service_name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.getServices();
  }

  getServices(){
    this.services = [
      { 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        service_name:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },
    ]
    this.api.getServices(this.serviceForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addService() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
        return;
    }

    this.api.addService(this.serviceForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.serviceForm.controls;
  }
}
