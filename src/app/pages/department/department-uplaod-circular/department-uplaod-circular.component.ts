import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-department-uplaod-circular',
  templateUrl: './department-uplaod-circular.component.html',
  styleUrls: ['./department-uplaod-circular.component.css']
})
export class DepartmentUplaodCircularComponent implements OnInit {

  filterForm: FormGroup;
  submitted = false;
  uploadCircular: Array<any> = [];
  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      financial_year: [''],
      season: ['']
    });
    this.getUploadCircular();
  }

  getUploadCircular() {
    this.uploadCircular = [
      {
        sno: "1",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "2",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "3",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "4",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      }
      
    ]

  }

  filterProduction() {
    this.getUploadCircular();
  }

  get formControls() {
    return this.filterForm.controls;
  }

}
