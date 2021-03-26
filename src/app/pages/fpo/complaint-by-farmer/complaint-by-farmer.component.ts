import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';


@Component({
  selector: 'app-complaint-by-farmer',
  templateUrl: './complaint-by-farmer.component.html',
  styleUrls: ['./complaint-by-farmer.component.css']
})
export class ComplaintByFarmerComponent implements OnInit {

  complaintForm: FormGroup;
  complaintStatusForm: FormGroup
  submitted = false;
  complaintsCatageriy: Array<any> = [];
  complaints: Array<any> = [];
  p: number = 1;
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  edit = false;
  percentDone: number;
  uploadSuccess: boolean;
  fileToUpload: File = null;
  isViewComplaint = false;
  roleType: any;
  users: any[];
  fliterForm: FormGroup;
  filterResponse: any[];
  viewComp = { title: "", compalintDate: '', description: '', currentStatus: '', assignedTo: '', assigned_date: '', remarks: '', farmerId: '', name: "", mobile: "", email: "" }
  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.authService.getDeptmentUser().subscribe(u => {
      this.users = u
    })
    this.api.getComplaints_Suggestions().subscribe(cs => {
      this.complaintsCatageriy = cs
    })
    this.fliterForm = this.formBuilder.group({
      complaint: ['New']

    });
    fpoId: localStorage.getItem('masterId')
    this.getComplaints();
  }

  getComplaints() {

    this.api.getComplaintsFpoFarmer(Number(localStorage.getItem('masterId'))).subscribe(response => {
      console.log(response);
      this.filterResponse = response
      this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
      this.fliterForm.controls['complaint'].setValue('New')
    });

  }


  get formControls() {
    return this.complaintStatusForm.controls;
  }
  
  updateSatus(viewComp) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.complaintStatusForm.invalid) {
      return;
    }
    delete this.complaintStatusForm.value.appointmentDate;
    const formData: FormData = new FormData();
 
    formData.append('id', this.complaintStatusForm.value.id);
    formData.append('assign_to', this.complaintStatusForm.value.assign_to);
    formData.append('comment', this.complaintStatusForm.value.comment);
    formData.append('status', this.complaintStatusForm.value.status);
 
    this.api.updateStatusComplaint(this.complaintStatusForm.value, formData).subscribe(response => {
      console.log(response);
      if (response.id != '') {
        this.toastr.success('complians successfully.');
        this.submitted = false;
        this.edit = false;
        this.complaintStatusForm.reset();
        this.getComplaints();
        this.isViewComplaint = false;
      } else {
        this.toastr.error('Error! While Updating License.');
      }
     
    });
  }
  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.id == idSecond.id;
  }
  reset() {
    this.submitted = false;
    this.edit = false;
    this.complaintForm.reset();
  }
  close() {
    this.isViewComplaint = false;
  }
  viewComplaint(complaint) {
    this.api.getfamerDetail(complaint.farmerId).subscribe(f => {
      f
    })
    this.isViewComplaint = true;
    this.viewComp.farmerId = complaint.farmerId
    this.viewComp.assignedTo = complaint.assignby;
    this.viewComp.assigned_date = complaint.assigneddate;
    this.viewComp.currentStatus = this.getStatus(complaint.status);
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.createdate;
    this.viewComp.remarks = complaint.deptcomment;
    this.viewComp.title = complaint.ftitle;
    this.viewComp.name = complaint.farmername,
      this.viewComp.mobile = complaint.farmermobile
    window.scroll(0, 0);
    let myDate = new Date();
    this.complaintStatusForm = this.formBuilder.group({
      id: [complaint.id],
      assign_to: ['', [Validators.required]],
      appointmentDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      comment: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    
  }
  filterComaplaint() {
    if (this.fliterForm.controls['complaint'].value === "New") {
      this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
    }
    else if (this.fliterForm.controls['complaint'].value === "resolved") {
      this.complaints = this.filterResponse.filter(f => this.getStatus(f.status) === 'RESOLVED');
    }
    else {
      this.complaints = this.filterResponse.filter(f => f.status );

    }
  }
  getStatus(status) {
    if (status == 0) {
      return "OPEN"
    } else if (status == 1) {
      return "ASSIGNED"
    }
    else if (status == 2) {
      return "RESOLVED"
    }
    else {
      return "RESOLVED"
    }

  }
}

