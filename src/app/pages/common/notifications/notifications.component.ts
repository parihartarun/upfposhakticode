import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';




@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  NotificationsForm: FormGroup;   
  submitted = false;
   getalluserlist: Array<any> = [];
   notifications =[];  
  constructor(private formBuilder: FormBuilder,private api: FpoService,private route: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
  //  this.api.getAllUsers().subscribe(us => {
  //     this.getalluserlist = us;
  //   })

    this.notifications=[
      {
      "title": "FPO_Famer1",
      "description": "The shortest article. Ever.",     
      "uploadDate": "2015-05-22T14:56:28.000Z"
    },
    {
      "title": "FPO_Famer2",
      "description": "Farmer Producer Company.",     
      "uploadDate": "2015-08-22T14:56:28.000Z"
    },
    {
      "title": "FPO_Famer2",
      "description": "The FPO can aggregate the produce better.",     
      "uploadDate": "2015-09-22T14:56:28.000Z"
    }
    ]
      


    this.NotificationsForm = this.formBuilder.group({
        userName: ['', [Validators.required]],
        desc: ['', [Validators.required]], 
        receiver_id: [''],
        farmerId:[''],
        sender_id: [''],
        title: [''],    
        masterId: localStorage.getItem('masterId'),      
    });
  }
   reset() {
    this.NotificationsForm.reset();
  }

   getAllNotification() {   
    // this.api.getAllnotifocation().subscribe(response => {
    //   console.log(response);
    //   this.notifications = response;
    // });

  }
viewNotifications(){

}
sendNotifications(){

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


