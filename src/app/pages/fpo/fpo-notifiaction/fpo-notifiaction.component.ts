import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-fpo-notifiaction',
  templateUrl: './fpo-notifiaction.component.html',
  styleUrls: ['./fpo-notifiaction.component.css']
})
export class FpoNotifiactionComponent implements OnInit {


  NotificationsForm: FormGroup;
  submitted = false;
  getalluserlist: Array<any> = [];
  notifications = [];
  p: number = 1;
  fileToUpload:any

  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //  this.api.getAllUsers().subscribe(us => {
    //     this.getalluserlist = us;
    //   })

    this.notifications = [
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
      fpoId: [''],
      sender_id: [''],
      uploadFile: ['', [Validators.required]],
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
  viewNotifications() {

  }
  sendNotifications() {

  }

  get formControls() {
    return this.NotificationsForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}


