import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/_services/department/department.service';


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
  isEdit = false;
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
    
    this.api.getAllCircluarUpload().subscribe(cu => {
      this.uploadCircular = cu;
    })
  }

  

  get formControls() {
    return this.uploadCircularForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    this.checkfileFormat = false;
   
  }
 
  addUploadCircular() {
    this.submitted = true;
    if (this.uploadCircularForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description ', this.uploadCircularForm.value.description);   
    this.api.addUploadCircular(formData).subscribe(response => {
      if (response) {
        this.toastr.success(response.message);
        this.submitted = false;
        this.uploadCircularForm.reset();
        this.getUploadCircular()
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }
  upadateCircular() {
    this.submitted = true;
    if (this.uploadCircularForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description ', this.uploadCircularForm.value.description);
    this.api.updateCircular(formData, this.uploadCircularForm.value).subscribe(response => {
      if (response) {
        this.toastr.success(response.message);
        this.submitted = false;
        this.uploadCircularForm.reset();
        this.getUploadCircular();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }
  reset() {
    this.uploadCircularForm.reset();
  }
  editCicular(circular) {
    this.isEdit = true;
    this.uploadCircularForm = this.formBuilder.group({
      description: [circular.description, Validators.required],
      uploadFile: [''],
      id:circular.id
    });
   
    window.scroll(0, 0);
  }
  deleteCicular(circular) {  
      this.api.deleteCircular(circular.id).subscribe(response => {
        if (response != '') {
          this.toastr.success('Delete successfully');
          this.getUploadCircular();
        } else {
          this.toastr.error('Error! While Add complaint.');
        }
      });
    
  }
}
