import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../_services/department/department.service';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-department-all-users',
  templateUrl: './department-all-users.component.html',
  styleUrls: ['./department-all-users.component.css']
})
export class DepartmentAllUsersComponent implements OnInit {

  filterForm: FormGroup;
  submitted = false;
  activeUsers: Array<any> = [];
  deActiveUsers: Array<any> = [];
  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private api: UserService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      financial_year: [''],
      season: ['']
    });
    this.getUsers();
  }

  getUsers() {
    let users = [
      {
        sno:'01',        
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate:'21-12-2020',
        email: "www.rampurkrishakfpo.in",
        status:0
       
      },
      {
        sno: '02',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in",
          status: 1

      },
      {
        sno: '03',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in",
        status: 0,
      },
      {
        sno: '04',
        fpoName: 'SHIVMURAT HITECH PRODUCER COMPANY LIMITED',
        userName: 'Vishal',
        district: "Agra",
        requestDate: '21-12-2020',
        email: "www.rampurkrishakfpo.in",
        status: 1
      }
    ]
    this.activeUsers = users.filter(u => u.status == 0);
    this.deActiveUsers = users.filter(u => u.status ==1)

  }

  filterProduction() {
    this.getUsers();
  }

  get formControls() {
    return this.filterForm.controls;
  }
  DeActiveUSer(user) {
    this.changeStatus(user)
  }
  activeUSer(user) {

    this.changeStatus(user)
  }
  changeStatus(user) {  

    this.api.updateUser(user).subscribe(response => {
      if (response) {
        this.toastr.success(response.message);

        this.getUsers();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }
  deleteCicular(user) {
    this.api.deleteUser(user.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.getUsers();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });

  }

}
