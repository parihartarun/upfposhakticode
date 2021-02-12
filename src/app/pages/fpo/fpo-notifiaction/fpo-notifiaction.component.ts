import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-fpo-notifiaction',
  templateUrl: './fpo-notifiaction.component.html',
  styleUrls: ['./fpo-notifiaction.component.css']
})
export class FpoNotifiactionComponent implements OnInit {

  NotificationsForm: FormGroup;
  submitted = false;
  fpos: Array<any> = [];
  notifications = [];
  p: number = 1;
  fileToUpload: any
  farmers:any[]
  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router, private toastr: ToastrService
    , private _departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.api.getAllFarmer().subscribe(us => {
      this.farmers = us;
    })
    this.getNotificationByFPO();
    



    this.NotificationsForm = this.formBuilder.group({

      message: ['', [Validators.required]],
      
      farmer_id: ['', [Validators.required]],
      uploadFile: ['', [Validators.required]],
      dept_id: localStorage.getItem('masterId'),
    });
  }
  reset() {
    this.NotificationsForm.reset();
  }
  getNotificationByFPO() {
    this.api.getAllNotificationByFpo(localStorage.getItem('masterId')).subscribe(us => {
      this.notifications = us;
    })
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
    formData.append('farmer_id', this.NotificationsForm.value.farmer_id);
    formData.append('message', this.NotificationsForm.value.message);
    formData.append('fpo_id', localStorage.getItem('masterId'));
    formData.append("role", localStorage.getItem('userRole'))
    this.api.sendNotifiaction(this.NotificationsForm.value, formData).subscribe(response => {
      console.log(response);
      if (response.id != '') {
        this.toastr.success('complians successfully.');
        this.submitted = false;
        this.getNotificationByFPO();
        this.NotificationsForm.reset();
      } else {
        this.toastr.error('Error! While Updating License.');
      }
      // this.getComplaints();
    });
  }
  selectfPo(complaint) {
    this.NotificationsForm.controls['farmer_id'].setValue(complaint.currentTarget.value);

  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
