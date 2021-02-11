import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth/auth.service';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
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
  viewComp = { title: "", compalintDate: '', description: '', currentStatus: '', assignedTo: '', assigned_date: '', remarks: '', farmerId:''}
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
    this.complaintForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        desc: ['', [Validators.required]],
        filePath: [''],
        uploadFile: [''],
        issueType: ['', [Validators.required]],
        masterId: localStorage.getItem('masterId'),
    });
    fpoId: localStorage.getItem('masterId')
    this.getComplaints();
  }

  getComplaints() {
   
    this.api.getComplaints(Number(localStorage.getItem('masterId'))).subscribe(response => {
      console.log(response);
      this.complaints = response;
    });

  }

  addComplaint() {
    this.submitted = true;
    if (this.complaintForm.invalid) {
      return;
    }
    let model = this.complaintForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);  
    formData.append('description', this.complaintForm.value.desc);
    formData.append('title', this.complaintForm.value.title.comp_type_en);
    formData.append('issue_type', this.complaintForm.value.issueType);
    formData.append("farmer_id", localStorage.getItem('masterId'))
    this.api.addComplaint(formData).subscribe(response => {
      if (response!= '') {
        this.toastr.success('Complaint Added Succefully.');
        this.submitted = false;
        this.edit = false;
        this.complaintForm.reset();
        this.getComplaints();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }

  get formControls() {
    return this.complaintForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    //if (!this.validateFile(files[0].name)) {
    //  this.checkfileFormat = true;
    //  this.myInputVariable.nativeElement.value = "";
    //  return;
    //}
    //else {
    
    //  this.checkfileFormat = false;
    //}
  }
 
  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(this.complaintsCatageriy[parseInt(complaint.currentTarget.value)]);
    this.complaintForm.controls['issueType'].setValue(parseInt(complaint.currentTarget.value));

  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpgj"||ext.toLowerCase() == "jpeg" || ext.toLowerCase()=="pdf") {
      return true;
    }
    else {
      return false;
    }
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
  editCompliant(complaint) {
    this.edit = true;
    window.scroll(0, 0);
    this.complaintForm = this.formBuilder.group({
      id: [complaint.id],
      title: [complaint.title, Validators.required],
      desc: [complaint.desc, Validators.required],
    
    });
    this.complaintForm.controls['title'].patchValue(complaint.title);
    this.complaintForm.get('title').patchValue(complaint.title);
    
  }
  updateSatus(viewComp) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.complaintStatusForm.invalid) {
      return;
    }
    delete this.complaintStatusForm.value.appointmentDate;
    this.api.updateComplaint(this.complaintStatusForm.value).subscribe(response => {
      console.log(response);
      if (response.id != '') {
        this.toastr.success('complians successfully.');
        this.submitted = false;
        this.edit = false;
        this.complaintForm.reset();
      } else {
        this.toastr.error('Error! While Updating License.');
      }
      this.getComplaints();
    });
  }
  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.id == idSecond.id;
  }
  reset() {
    this.complaintForm.reset();
  }
  close() {
    this.isViewComplaint = false;
  }
  viewComplaint(complaint) {
    this.isViewComplaint = true;
    this.viewComp.farmerId = complaint.farmerId
    this.viewComp.assignedTo = complaint.assignTo;
    this.viewComp.assigned_date = complaint.assigned_date;
    this.viewComp.currentStatus = complaint.status;
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.uploadDate;
    this.viewComp.remarks = complaint.remarks;
    this.viewComp.title = complaint.title;
    window.scroll(0, 0);
    let myDate = new Date();
    //this.complaintStatusForm = this.formBuilder.group({
    //  id:[complaint.id],
    //  assign_to: ['', [Validators.required]],
    //  appointmentDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
    //  comment : ['', [Validators.required]],
    //  status : ['', [Validators.required]],
     


    //});
  }
 
}


