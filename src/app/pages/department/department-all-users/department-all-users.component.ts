import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../_services/department/department.service';

@Component({
  selector: 'app-department-all-users',
  templateUrl: './department-all-users.component.html',
  styleUrls: ['./department-all-users.component.css']
})
export class DepartmentAllUsersComponent implements OnInit {

  filterForm: FormGroup;
  submitted = false;
  users: Array<any> = [];
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
    this.getUsers();
  }

  getUsers() {
    this.users = [
      {
        sno:'01',        
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate:'21-12-2020',
        email:"www.rampurkrishakfpo.in"
       
      },
      {
        sno: '02',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in"

      },
      {
        sno: '03',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in"

      },
      {
        sno: '04',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in"

      }
    ]

  }

  filterProduction() {
    this.getUsers();
  }

  get formControls() {
    return this.filterForm.controls;
  }


}
