import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {

  salesForm: FormGroup;
  submitted = false;
  sales:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      season: ['', [Validators.required]],
      cropName: ['', [Validators.required]],
      cropVariety: ['', [Validators.required]],
      quantity_sold: ['', [Validators.required]]
    });
    this.getFpoSalesInfo();
  }

  getFpoSalesInfo(){
    this.sales = [
      { 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },
      { 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },{ 
        season:'Rabi',
        cropName:'Carrot',
        cropVariety:'cropVariety 1',
        quantity_sold:'232',
      },
    ]
    this.api.getFpoSalesInfo(this.salesForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  addFpoSalesInfo() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.salesForm.invalid) {
        return;
    }

    this.api.addFpoSalesInfo(this.salesForm.value).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.salesForm.controls;
  }


}
