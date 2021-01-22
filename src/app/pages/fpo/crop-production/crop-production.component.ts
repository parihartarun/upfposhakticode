import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-crop-production',
  templateUrl: './crop-production.component.html',
  styleUrls: ['./crop-production.component.css']
})
export class CropProductionComponent implements OnInit {

  productionForm: FormGroup;
  submitted = false;
  cropProductions:Array<any>=[];
  p:number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productionForm = this.formBuilder.group({
      season: ['', [Validators.required]],
      cropName: ['', [Validators.required]],
      cropVariety: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      actualProduction: ['', [Validators.required]],
      marketableSurplus: ['', [Validators.required]],
      //seasonRefId:localStorage.getItem('masterId')
    });
    this.getCropProduction();
  }

  getCropProduction(){
    this.cropProductions = [
      { 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },
      { 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },
      { 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },
      { 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },{ 
        season:'Kharif',
        cropName:'Carrot',
        cropVariety:'Variety 1',
        actualProduction:'200',
        marketableSurplus:'232',
      },
  ]
}

addCropProduction() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.productionForm.invalid) {
      return;
  }

  this.api.addCropProduction(this.productionForm.value).subscribe(response => {
    console.log(response);
  },
    err => {
      console.log(err)
    }
  );
}

get formControls(){
  return this.productionForm.controls;
}

}
