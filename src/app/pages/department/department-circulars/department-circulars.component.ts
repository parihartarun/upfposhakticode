import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/_services/department/department.service';


@Component({
  selector: 'app-department-circulars',
  templateUrl: './department-circulars.component.html',
  styleUrls: ['./department-circulars.component.css']
})
export class DepartmentCircularsComponent implements OnInit {
  filterForm: FormGroup;
  submitted = false;
  production: Array<any> = [];
  p: number = 1;
  edit: boolean=false
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
