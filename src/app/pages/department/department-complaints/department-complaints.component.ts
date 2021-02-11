import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth/auth.service';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-department-complaints',
  templateUrl: './department-complaints.component.html',
  styleUrls: ['./department-complaints.component.css']
})
export class DepartmentComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
  submitted = false;
  complaintsCatageriy: Array<any> = [];
  complaints: Array<any> = [];
  p: number = 1;
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileToUpload: File = null;
  isViewComplaint = false;
  users : Array<any> =[];
  viewComp = { title: "", compalintDate: '', description: '', currentStatus: '', assignedTo: '', assigned_date: '', remarks: '', name: "", mobile: "", email:"" }
  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getDeptmentUser().subscribe(u => {
      this.users=u
    })

    this.complaintForm = this.formBuilder.group({
      appointment: ['', [Validators.required]],
      appointmentDate: ['20/03/2020'],
      departmentComments: ['',[Validators.required]],
      complaintStatus: ['', [Validators.required]],
      masterId: localStorage.getItem('masterId'),

    });
    fpoId: localStorage.getItem('masterId')
    this.getComplaints();
  }

  getComplaints() {
   
    this.api.getComplaints().subscribe(response => {      
      this.complaints = response;
    });

  }

  updateSatus() {
    this.submitted = true;
    if (this.complaintForm.invalid) {
      return;
    }
   
    this.api.updateStatus(this.complaintForm.value).subscribe(response => {
      if (response.id != '') {
        this.toastr.success(response);
        this.submitted = false;        
        this.complaintForm.reset();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }

  get formControls() {
    return this.complaintForm.controls;
  }
  

  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(complaint.currentTarget.value);
  }
  
  deleteCompliant(complaint) {
    this.api.deleteCompliant(complaint.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.getComplaints();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }
 
 
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.id == idSecond.id;
  }
  reset() {
    this.complaintForm.reset();
  }
  close() {
    this.isViewComplaint = false;
  }
  
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  viewComplaint(complaint) {
    this.isViewComplaint = true;
    this.viewComp.assignedTo = complaint.assignTo;
    this.viewComp.assigned_date = complaint.assigned_date;
    this.viewComp.currentStatus = complaint.status;
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.uploadDate;
    this.viewComp.remarks = complaint.remarks;
    this.viewComp.title = complaint.title;
    this.viewComp.name = complaint
    window.scroll(0, 0)

  }
}
