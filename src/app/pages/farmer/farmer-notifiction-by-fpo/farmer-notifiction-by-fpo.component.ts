import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FarmerService } from 'src/app/_services/farmer/farmer.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


@Component({
  selector: 'app-farmer-notifiction-by-fpo',
  templateUrl: './farmer-notifiction-by-fpo.component.html',
  styleUrls: ['./farmer-notifiction-by-fpo.component.css']
})
export class FarmerNotifictionByFpoComponent implements OnInit {

  NotificationsForm: FormGroup;
  submitted = false;
  getalluserlist: Array<any> = [];
  notifications = [];
  p: number = 1;
  isViewComplaint = false;
  notification: any
  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router,
    private toastr: ToastrService, private _farmerService: FarmerService
   ) { }

  ngOnInit(): void {
    this._farmerService.getAllNotificationByFpo(localStorage.getItem('masterId')).subscribe(us => {
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
    this.notification = notification
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

