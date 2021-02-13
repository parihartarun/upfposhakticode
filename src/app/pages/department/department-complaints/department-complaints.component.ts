import { DatePipe } from '@angular/common';
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
    private authService: AuthService, private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.authService.getDeptmentUser().subscribe(u => {
      this.users=u
    })

   
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
    const formData: FormData = new FormData();

    formData.append('id', this.complaintForm.value.id);
    formData.append('assign_to', this.complaintForm.value.assign_to);
    formData.append('comment', this.complaintForm.value.comment);
    formData.append('status', this.complaintForm.value.status);
    this.api.updateStatus(this.complaintForm.value, formData).subscribe(response => {
      if (response.id != '') {
        this.toastr.success(response);
        this.submitted = false;        
        this.complaintForm.reset();
        this.getComplaints();
        this.isViewComplaint = false;
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
    this.viewComp.assignedTo = complaint.assignBy;
    this.viewComp.assigned_date = complaint.assigneddate;
    this.viewComp.currentStatus = this.getStatus(complaint.status);
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.createdate;
    this.viewComp.remarks = complaint.createDateTime;
    this.viewComp.title = complaint.ftitle;
    this.viewComp.name = complaint.fponame;
    this.viewComp.email = complaint.fpoemail;
    window.scroll(0, 0)
    this.complaintForm = this.formBuilder.group({
      id: [complaint.id],
      assign_to: ['', [Validators.required]],
      appointmentDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      comment: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  getStatus(status) {
    if (status == 0) {
      return "OPEN"
    } else if (status == 1) {
      return "ASSOGNED"
    }
    else if (status == 2) {
      return "RESOLVED"
    }
    else {
      return "RESOLVED"
    }

  }
}
