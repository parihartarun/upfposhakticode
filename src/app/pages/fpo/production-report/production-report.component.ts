import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-production-report',
  templateUrl: './production-report.component.html',
  styleUrls: ['./production-report.component.css']
})
export class ProductionReportComponent implements OnInit {
  filterForm: FormGroup;
  submitted = false;
  production:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      financial_year: [''],
      season: ['']
    });
    this.getBoardMembers();
  }

  getBoardMembers(){
    this.production = [
      { 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },{ 
        name:'Vaishali Patil',
        fatherName:'Namdev Patil',
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'variety 1',
        markatableSurplus:'23'
      },
    ]
    this.api.getBoardMembers(this.filterForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addBoardMember() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
        return;
    }

    this.api.addBoardMember(this.filterForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.filterForm.controls;
  }

}
