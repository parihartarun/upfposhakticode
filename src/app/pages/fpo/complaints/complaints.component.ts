import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
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

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.api.getComplaints_Suggestions().subscribe(cs => {
      this.complaintsCatageriy = cs
    })
    this.complaintForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        desc: ['', [Validators.required]],
        filePath: [''],
      uploadFile: [''],
      masterId: localStorage.getItem('masterId'),
      
    });
    fpoId: localStorage.getItem('masterId')
    this.getComplaints();
  }

  getComplaints() {
    this.complaints = [
      {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        description: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, {
        title: 'Scheme Benefits',
        desc: 'dsb hbsdbs hjwdnjw hdnejwde wchjdwcew',
        file: 'sed.jpg'
      }, 
    ]
    this.api.getComplaints().subscribe(response => {
      console.log(response);
      this.complaints = response;
    });

  }

  addComplaint() {
    this.submitted = true;
    if (this.complaintForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('complaint', this.complaintForm.value);

    this.api.addComplaint(formData).subscribe(response => {
      if (response.id != '') {
        this.toastr.success(response);
        this.submitted = false;
        this.edit = false;
        this.complaintForm.reset();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }

  get formControls() {
    return this.complaintForm.controls;
  }
  upload(files: FileList) {
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      return;
    }
    else {
      this.fileToUpload = files.item(0);
      this.checkfileFormat = false;
    }
  }
 
  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(complaint.currentTarget.value);
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
  deleteCompliant(id) {
    this.api.deleteCompliant(id).subscribe(response => {
      this.getComplaints();     
    });
  }
  editComplaint(complaint) {
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
  updateComplaint() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.complaintForm.invalid) {
      return;
    }
    this.api.updateComplaint(this.complaintForm.value).subscribe(response => {
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
  viewComplaint() {
    this.isViewComplaint = true;
  }
}


