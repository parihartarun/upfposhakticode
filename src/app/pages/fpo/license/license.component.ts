 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';



@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  licenseForm: FormGroup;
  submitted = false;
  licenses:Array<any>=[];
  p:number = 1;
  edit = false;
  licensesTypes:Array<any> = [];

  // related to files upload
  checkfileFormat = false;
  fileToUpload: File = null;
  fileToEdit:string;
  filePathToEdit:string;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.licenseForm = this.formBuilder.group({
      licenceType: ['', [Validators.required]],
      licenceIssuedBy: ['', [Validators.required]],
      liceneceNumber: ['', [Validators.required]],
      issuedate: [''],
      licenceValidTill: [''],
      fpoRefId:localStorage.getItem('masterId'),
      masterId:localStorage.getItem('masterId'),
      id:[''],
      licenceFile:['', [Validators.required]]
    });
    this.getLicense();
    this.getLicenseTypes();
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  getLicense(){
      this.api.getLicense(localStorage.getItem('masterId')).subscribe(response => {
        console.log(response);
        this.licenses = response;
      },
        err => {
          console.log(err)
        }
      );
  }

  getLicenseTypes(){
    this.api.getLicenseTypes().subscribe(response => {
      console.log(response);
      this.licensesTypes = response;
    },
      err => {
        console.log(err)
      }
    );
  }

addLicense() {

  this.submitted = true;
  // stop here if form is invalid
  if (this.licenseForm.invalid) {
      return;
  }
  this.licenseForm.patchValue({
    fpoRefId:localStorage.getItem('masterId'),
    masterId:localStorage.getItem('masterId')
  });

  // console.log(this.licenseForm.value);

  let value = this.licenseForm.value;

  console.log(value); 
  let formData = new FormData();
  formData.append('licenceType', value.licenceType);
  formData.append('liceneceNumber', value.liceneceNumber);
  formData.append('licenceIssuedBy', value.licenceIssuedBy);
  formData.append('issuedate', value.issuedate);
  formData.append('licenceValidTill', value.licenceValidTill);
  formData.append('fpoRefId', value.fpoRefId);
  formData.append('masterId', value.masterId);
  formData.append('file', this.fileToUpload);

  this.api.addLicense(formData).subscribe(response => {
    console.log(response)
    if(response.id != ''){
        this.toastr.success('License Added Successfully.');
        this.submitted = false;
        this.fileToUpload = null;
        this.licenseForm.reset();
        this.getLicense();
    }else{
        this.toastr.error('Error! While Adding License.');
    }
  },
    err => {
      console.log(err)
    }
  );
}

editLicense(license){

  this.filePathToEdit = null;
  if(license.filePath != null){
    var pathParts = license.filePath.split("/");
    this.fileToEdit = pathParts[pathParts.length - 1];
    this.filePathToEdit = license.filePath;
  }

  console.log(license);
  this.licenseForm = this.formBuilder.group({
    licenceType: [license.licenceType, [Validators.required]],
    licenceIssuedBy: [license.licenceIssuedBy, [Validators.required]],
    liceneceNumber: [license.liceneceNumber, [Validators.required]],
    issuedate: [license.issuedate],
    licenceValidTill: [license.licenceValidTill],
    fpoRefId:localStorage.getItem('masterId'),
    masterId:localStorage.getItem('masterId'),
    id:[license.id],
    licenceFile:['']
  });
  //this.licenseForm.get('issuedate').patchValue(this.formatDate(license.issuedate));
  //this.licenseForm.get('licenceValidTill').patchValue(this.formatDate(license.licenceValidTill));

  this.edit = true;
  window.scroll(0,0);
}

private formatDate(date) {
  console.log(date);
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, day, month].join('-');
}

updateLicense(){
  this.submitted = true;
  // stop here if form is invalid
  if (this.licenseForm.invalid) {
      return;
  }

  let value = this.licenseForm.value;

  let formData = new FormData();
  formData.append('licenceType', value.licenceType);
  formData.append('liceneceNumber', value.liceneceNumber);
  formData.append('licenceIssuedBy', value.licenceIssuedBy);
  formData.append('issuedate', value.issuedate);
  formData.append('licenceValidTill', value.licenceValidTill);
  formData.append('fpoRefId', value.fpoRefId);
  formData.append('masterId', value.masterId);
  formData.append('id', value.id);
  formData.append('file', this.fileToUpload);

  this.api.updateLicense(formData, this.licenseForm.value.id).subscribe(response => {
    console.log(response);
    if(response.id != ''){
      this.toastr.success('License Updated Successfully.');
      this.submitted = false;
      this.edit = false;
      this.fileToUpload = null;
      this.licenseForm.reset();
    }else{
        this.toastr.error('Error! While Updating License.');
    }
    this.getLicense();
  },
    err => {
      console.log(err)
    }
  );
}

confirmDelete(licenseId){
  if(confirm("Are you sure to delete this item")) {
    this.api.deleteLicense(licenseId).subscribe(response => {
      console.log(response);
      if(response == true){
        this.toastr.success('License Deleted Successfully.');
        this.getLicense();
      }else{
          this.toastr.error('Error! While Deleting License.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }
}

resetForm(){
  this.licenseForm.reset();
  this.submitted = false;
  this.edit = false;
}

get formControls(){
  return this.licenseForm.controls;
}

handleFileInput(files: FileList) {
  console.log(files);
  this.fileToUpload = files.item(0);

  if (!this.validateFile(files[0].name)) {
    this.checkfileFormat = true;
    this.fileToUpload = null;
    this.licenseForm.get('licenceFile').setValue('');
    return;
  }
  else {
    this.checkfileFormat = false;
  }
}

validateFile(name: String) {
  let ext = name.substring(name.lastIndexOf('.') + 1);
  if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" ||  ext.toLowerCase() == "jpg" || ext.toLowerCase()=="pdf" || ext.toLowerCase()=="doc" || ext.toLowerCase()=="docx" || ext.toLowerCase()=="txt") {
    return true;
  }
  else {
    return false;
  }
}

}
