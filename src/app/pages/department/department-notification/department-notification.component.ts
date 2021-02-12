import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-department-notification',
  templateUrl: './department-notification.component.html',
  styleUrls: ['./department-notification.component.css']
})
export class DepartmentNotificationComponent implements OnInit {

  NotificationsForm: FormGroup;
  submitted = false;
  fpos: Array<any> = [];
  notifications = [];
  p: number = 1;
  fileToUpload:any

  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router, private toastr: ToastrService
    , private _departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.api.getAllFpo().subscribe(us => {
      this.fpos = us;
       })

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

      message: ['', [Validators.required]],
      fpo_id: ['', [Validators.required]],      
        uploadFile: ['', [Validators.required]],
        dept_id: localStorage.getItem('masterId'),
    });
  }
  reset() {
    this.NotificationsForm.reset();
  }

 
  viewNotifications() {

  }
  get formControls() {
    return this.NotificationsForm.controls;
  }
   sendNotifications() {  
     this.submitted = true;
     
      if (this.NotificationsForm.invalid) {
        return;
     }
     const formData: FormData = new FormData();
     formData.append('file', this.fileToUpload);
     formData.append('fpo_id', this.NotificationsForm.value.fpo_id);
     formData.append('message', this.NotificationsForm.value.message);
     formData.append('dept_id ', localStorage.getItem('masterId'));
     formData.append("role", localStorage.getItem('userRole'))
     this._departmentService.sendNotifiaction(this.NotificationsForm.value, formData).subscribe(response => {
       console.log(response);
       if (response.id != '') {
         this.toastr.success('complians successfully.');
         this.submitted = false;
         // this.edit = false;
         this.NotificationsForm.reset();
       } else {
         this.toastr.error('Error! While Updating License.');
       }
      // this.getComplaints();
     });
   }
  selectfPo(complaint) {
    this.NotificationsForm.controls['fpo_id'].setValue(complaint.currentTarget.value);
   
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
      }
}


