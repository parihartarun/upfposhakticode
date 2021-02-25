import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';


  @Component({
    selector: 'app-input-details-fertilizer',
    templateUrl: './input-details-fertilizer.component.html',
    styleUrls: ['./input-details-fertilizer.component.css']
})
export class InputDetailsFertilizerComponent implements OnInit {
  fertitype: any;
  subtype:any;
  checked: boolean = false;
  // selected: boolean = false;
  selectedvalue: any;
  chemicalchecked: boolean;
  biochecked: boolean;
  organicchecked: boolean;
    fertilizerDetails: any;
 

  constructor(private fb: FormBuilder,
    private inputsupplierfertiservice: InputSupplierService,
     private fposervice: FpoService,
     private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
this.Getallfertilizer();
  }

  public fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }


  selectvalue(type) {
    console.log(type);
    this.fertitype = type
  }


  selectedtype(type)
  {
    console.log(type);
    this.subtype = type
  }

  ChangingtypeValue(e)
  {
    console.log(e);
  }


  Getallfertilizer()
  {
      this.inputsupplierfertiservice.getallfertilizer().subscribe((res)=>{
        console.log(res);
        this.fertilizerDetails = res;
      })
  }

}
