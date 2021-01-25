import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-department-uplaod-circular',
  templateUrl: './department-uplaod-circular.component.html',
  styleUrls: ['./department-uplaod-circular.component.css']
})
export class DepartmentUplaodCircularComponent implements OnInit {

  filterForm: FormGroup;
  submitted = false;
  production: Array<any> = [];
  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      financial_year: [''],
      season: ['']
    });
    this.getProduction();
  }

  getProduction() {
    this.production = [
      {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      }, {
        name: 'Vaishali Patil',
        fatherName: 'Namdev Patil',
        season: 'Kharif',
        cropName: 'Carrot',
        cropVariety: 'variety 1',
        markatableSurplus: '23'
      },
    ]

  }

  filterProduction() {
    this.getProduction();
  }

  get formControls() {
    return this.filterForm.controls;
  }

}
