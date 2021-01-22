import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
  submitted = false;
  complaints:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.complaintForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: ['', [Validators.required]],
      fpoId:localStorage.getItem('masterId')
    });
    this.getComplaints();
  }

  getComplaints(){
    this.complaints = [
      { 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },{ 
        category:'Scheme Benefits',
        description:'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file:'sed.jpg'
      },
    ]
    this.api.getComplaints(this.complaintForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addComplaint() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.complaintForm.invalid) {
        return;
    }

    this.api.addComplaint(this.complaintForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.complaintForm.controls;
  }

}
