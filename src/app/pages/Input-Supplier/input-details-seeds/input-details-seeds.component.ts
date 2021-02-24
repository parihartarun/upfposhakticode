import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-seeds',
  templateUrl: './input-details-seeds.component.html',
  styleUrls: ['./input-details-seeds.component.css']
})
export class InputDetailsSeedsComponent implements OnInit {
  getallSeeds: any;
  croplist: any;
  seedForm: FormGroup;
  submitted = false;
  // districts = [];
  // blocks = [];

  constructor( private fb: FormBuilder,
    private inputsupplierseedservice: InputSupplierService,
     private fposervice: FpoService) { }

  ngOnInit(): void {
    this.getCropList();
    this.allseeds();

  
  }

  getCropList() {
    this.fposervice.getCropList().subscribe((res) => {
      this.croplist = res;
      console.log(res, "croplist");


      // this.fposervice.getCropVarietiesByCropId(res.cropId).subscribe(v => {
      //   console.log(v,"variety");
      // })
  
    })
  }



  selectcrops(crop_id: any) {
    this.seedForm.controls['cropId'].setValue(parseInt(crop_id.currentTarget.value));
    this.fposervice.getCropVarietiesByCropId(parseInt(crop_id.currentTarget.value)).subscribe(v => {
      console.log(v,"variety");
    })
  }
  // selectBlock(blockId: any) {
  //   this.fposervice.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(gp => {
  //     this.panchayts = gp
  //   })
  //   this.registerForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  // }


  allseeds() {
    this.inputsupplierseedservice.getallseeds().subscribe((res) => {
      this.getallSeeds = res;
      console.log(res, "seeddata");
    })
  }




  createseedForm(){
    this.seedForm = this.fb.group({
      certification_no: [''],
      company: [''],
      crop_id: ['', Validators.required],
      file:[''],
      quantity:[''],
      valid_from:[''],
      valid_to:[''],
      variety_id:['']
    })
  }


}
