import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

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
        title: [''],
        desc: ['', [Validators.required]],
        filePath: [''],
        uploadFile: ['', [Validators.required]],
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
    var issuetype = 0
    if (Number(this.complaintForm.value.issueType) > 0) {
      issuetype = Number(this.complaintForm.value.issueType) - 1;
    }
    else {
      issuetype = 13
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);  
    formData.append('description', this.complaintForm.value.desc);
    formData.append('title', this.complaintsCatageriy[issuetype].comp_type_en);
    formData.append('issue_type', this.complaintForm.value.issueType);
    formData.append("fpo_id", localStorage.getItem('masterId'))
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
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.complaintForm.controls['uploadFile'].setValue('');
      return;
    }
    else {
    
      this.checkfileFormat = false;
    }
  }
 
  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(this.complaintsCatageriy[parseInt(complaint.currentTarget.value)]);
    this.complaintForm.controls['issueType'].setValue(parseInt(complaint.currentTarget.value));

  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase()=="pdf") {
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
  updateComplaint(viewComp) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.complaintStatusForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description', this.complaintForm.value.desc);
    formData.append('title', this.complaintForm.value.title.comp_type_en);
    formData.append('issue_type', this.complaintForm.value.issueType);
    formData.append("fpo_id", localStorage.getItem('masterId'))

    delete this.complaintStatusForm.value.appointmentDate;
    this.api.updateComplaint(this.complaintStatusForm.value, formData).subscribe(response => {
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
 
  reset() {
    this.complaintForm.reset();
  }
  close() {
    this.isViewComplaint = false;
  }
  viewComplaint(complaint) {
    this.isViewComplaint = true;
    this.viewComp.farmerId = complaint.farmerId
    this.viewComp.assignedTo = complaint.assignby;
    this.viewComp.assigned_date = complaint.createdate;
    this.viewComp.currentStatus = this.getStatus(complaint.status);
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.createdate;
    this.viewComp.remarks = complaint.deptcomment;
    this.viewComp.title = complaint.ftitle;
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


