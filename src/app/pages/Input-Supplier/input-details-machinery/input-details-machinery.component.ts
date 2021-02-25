import { Component, OnInit } from '@angular/core';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-machinery',
  templateUrl: './input-details-machinery.component.html',
  styleUrls: ['./input-details-machinery.component.css']
})
export class InputDetailsMachineryComponent implements OnInit {
  machinerydetails: any;
  mtypes: any;

  constructor(private inputmachineryservice : InputSupplierService) { }

  ngOnInit(): void {
    this.mtype();
    this.Machinerydata();
  }


  mtype()
  {
    this.inputmachineryservice.mtype().subscribe((res)=>{
      this.mtypes = res;
    })
  }

 Machinerydata()
 {
   this.inputmachineryservice.getallMachinery().subscribe((res)=>{
   this.machinerydetails = res;
  })
 }

}