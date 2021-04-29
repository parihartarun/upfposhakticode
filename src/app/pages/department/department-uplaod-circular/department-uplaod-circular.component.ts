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
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };
  fileToEdit:string;
  filePathToEdit:string;

  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.uploadCircularForm = this.formBuilder.group({
      description: ['', Validators.required],
      uploadFile: ['', Validators.required],
    });
    this.getUploadCircular();
  }

  getUploadCircular() {
    this.api.getAllCircluarUpload().subscribe(cu => {
      console.log(cu);
      this.uploadCircular = cu;
    })
  }



  get formControls() {
    return this.uploadCircularForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.uploadCircularForm.controls['uploadFile'].setValue('');
      return;
    }
    else {
      this.checkfileFormat = false;
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" ||  ext.toLowerCase() == "jpg" || ext.toLowerCase()=="pdf" || ext.toLowerCase()=="doc" || ext.toLowerCase()=="docx" || ext.toLowerCase()=="txt") {
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
    formData.append('description ', this.uploadCircularForm.value.description);
    this.api.addUploadCircular(formData).subscribe(response => {
      if (response) {
        this.toastr.success("Circular Added Successfully.");
        this.submitted = false;
        this.uploadCircularForm.reset();
        this.getUploadCircular()
      } else {
        this.toastr.error('Error! While Adding Circular.');
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
        this.toastr.success("Circular Updated Successfully.");
        this.submitted = false;
        this.uploadCircularForm.reset();
        this.getUploadCircular();
      } else {
        this.toastr.error('Error! While updating Circular.');
      }
    });
  }
  reset() {
    this.submitted = false;
    this.isEdit = false;
    this.uploadCircularForm.reset();
  }
  editCicular(circular) {
    console.log(circular);
    this.isEdit = true;
    if(circular.filePath != null){
      var pathParts = circular.filePath.split("/");
      this.fileToEdit = pathParts[pathParts.length - 1];
      this.filePathToEdit = circular.filePath;
    }
    this.uploadCircularForm = this.formBuilder.group({
      description: [circular.description, Validators.required],
      uploadFile: [''],
      id: circular.id
    });

    window.scroll(0, 0);
  }
  deleteCicular(circular) {
    this.api.deleteCircular(circular.id).subscribe(response => {
      this.toastr.success('Circular Deleted Successfully');
      this.getUploadCircular();
    });
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
}
