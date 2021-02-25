import { Component, OnInit } from '@angular/core';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-insecticides',
  templateUrl: './input-details-insecticides.component.html',
  styleUrls: ['./input-details-insecticides.component.css']
})
export class InputDetailsInsecticidesComponent implements OnInit {
  insecttypelist: any;
  insecticidedetails: any;

  constructor(private inputinsectservice: InputSupplierService) { }

  ngOnInit(): void {
    this.types();
    this.getallinsecticidesdata();

  }


  types() {
    this.inputinsectservice.insecttypes().subscribe((res) => {
      this.insecttypelist = res;
      console.log(res, "type");
    })
  }


  getallinsecticidesdata() {
    this.inputinsectservice.getallinsecticide().subscribe((res) => {
      this.insecticidedetails = res;
      console.log(this.insecticidedetails,"")
    })
  }

}
