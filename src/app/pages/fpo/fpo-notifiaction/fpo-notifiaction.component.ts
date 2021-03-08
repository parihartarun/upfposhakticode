import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


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
  fileToUpload:any
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
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
    this.api.getAllNotificationFpo(localStorage.getItem('masterId')).subscribe(us => {
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
    console.log(formData);
    this.api.sendNotifiaction(formData).subscribe(response => {
      console.log(response);
      this.toastr.success(response.message);
      this.submitted = false;
      this.getNotificationByFPO();
      this.NotificationsForm.reset();
    });
  }
  selectfPo(complaint) {
    this.NotificationsForm.controls['farmer_id'].setValue(complaint.currentTarget.value);

  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      console.log('ss');
      this.checkfileFormat = true;
      this.fileToUpload = null;
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
 

}
