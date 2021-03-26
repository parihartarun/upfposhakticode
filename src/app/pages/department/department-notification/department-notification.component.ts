import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


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
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };

  constructor(private formBuilder: FormBuilder, private api: FpoService, private route: Router, private toastr: ToastrService
    , private _departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.api.getAllFpo().subscribe(us => {
      this.fpos = us;
       })

    this.getNotificationByDept();

    this.NotificationsForm = this.formBuilder.group({

      message: ['', [Validators.required]],
      fpo_id: ['', [Validators.required]],      
        uploadFile: ['', [Validators.required]],
        dept_id: localStorage.getItem('masterId'),
    });
  }
  getNotificationByDept() {
    this.api.getAllNotificationDept(localStorage.getItem('masterId')).subscribe(us => {
      this.notifications = us;
    })
  }
  reset() {
    this.submitted = false;
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
         this.toastr.success('Notification Send successfully.');
         this.submitted = false;
         // this.edit = false;
         this.NotificationsForm.reset();
         this.checkfileFormat = false;
         this.getNotificationByDept();
       } else {
         this.toastr.error('Error! While Sending Notification.');
       }
      // this.getComplaints();
     });
   }
  selectfPo(complaint) {
    this.NotificationsForm.controls['fpo_id'].setValue(complaint.currentTarget.value);
   
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.NotificationsForm.controls['uploadFile'].setValue('');
      return;
    }
    else {

      this.checkfileFormat = false;
    }
  }

  
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "pdf") {
      return true;
    }
    else {
      return false;
    }
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
}


