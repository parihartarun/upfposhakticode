import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


@Component({
  selector: 'app-fpo-notifiaction-by-department',
  templateUrl: './notifiaction-by-department.component.html',
  styleUrls: ['./notifiaction-by-department.component.css']
})
export class NotifiactionByDepartmentComponent implements OnInit {


  NotificationsForm: FormGroup;
  submitted = false;
  getalluserlist: Array<any> = [];
  notifications = [];
  p: number = 1;
  isViewComplaint = false;
  notification:any
  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router,
    private toastr: ToastrService,
    private _departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.api.getAllNotificationByFpo(localStorage.getItem('masterId')).subscribe(us => {
      console.log(us);
      this.notifications = us;
    })   
  }
  reset() {
    this.submitted = false;
    this.NotificationsForm.reset();
  }

  getAllNotification() {
    // this.api.getAllnotifocation().subscribe(response => {
    //   console.log(response);
    //   this.notifications = response;
    // });

  }
  viewNotifications(notification) {
    this.isViewComplaint = true;
    this.notification=notification
  }
  sendNotifications() {

  }
  close() {
    this.isViewComplaint = false;
  }

  get formControls() {
    return this.NotificationsForm.controls;
  }
  // sendNotifications() {  
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   // if (this.NotificationsForm.invalid) {
  //   //   return;
  //   // }
  //   this.api.updateNotification(this.NotificationsForm.value).subscribe(response => {
  //     console.log(response);
  //     if (response.id != '') {
  //       this.toastr.success('complians successfully.');
  //       this.submitted = false;
  //       // this.edit = false;
  //       this.NotificationsForm.reset();
  //     } else {
  //       this.toastr.error('Error! While Updating License.');
  //     }
  //    // this.getComplaints();
  //   });
  // }

}


