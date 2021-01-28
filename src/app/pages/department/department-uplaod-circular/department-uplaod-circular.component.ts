import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';

@Component({
  selector: 'app-department-uplaod-circular',
  templateUrl: './department-uplaod-circular.component.html',
  styleUrls: ['./department-uplaod-circular.component.css']
})
export class DepartmentUplaodCircularComponent implements OnInit {

  uploadCircularForm: FormGroup;
  submitted = false;
  uploadCircular: Array<any> = [];
  p: number = 1;
  fileToUpload: File = null;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  checkfileFormat = false;
  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.uploadCircularForm = this.formBuilder.group({
      description: ['', Validators.required],
      uploadFile: [''],
    });
    this.getUploadCircular();
  }

  getUploadCircular() {
    this.uploadCircular = [
      {
        sno: "1",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "2",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "3",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      },
      {
        sno: "4",
        description: "एफपीओ वार्षिक समीक्षा बैठक",
        uploadedDate: "2020-12-22",
        file: 'view File'
      }
      
    ]

  }

  

  get formControls() {
    return this.uploadCircularForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    this.checkfileFormat = false;
    //if (!this.validateFile(files[0].name)) {
    //  this.checkfileFormat = true;
    //  this.myInputVariable.nativeElement.value = "";
    //  return;
    //}
    //else {
    
    //}
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpgj" || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "pdf") {
      return true;
    }
    else {
      return false;
    }
  }
  addUploadCircular() {
    this.submitted = true;
    if (this.uploadCircularForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('desc', this.uploadCircularForm.value.desc);
   
    this.api.addUploadCircular(formData).subscribe(response => {
      if (response.id != '') {
        this.toastr.success(response);
        this.submitted = false;

        this.uploadCircularForm.reset();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }
  reset() {
    this.uploadCircularForm.reset();
  }

}
