import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceForm: FormGroup;
  submitted = false;
  services:Array<any>=[];
  p:number = 1;
  edit = false;
  fileToUpload: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      servicename: ['', [Validators.required]],
      descriptions: ['', [Validators.required]],
      file: ['', [Validators.required]],
      id:['']
    });
    this.getServices();
  }

  getServices(){
    this.api.getServices().subscribe(response => {
      console.log(response);
      this.services = response;
    },
      err => {
        console.log(err)
      }
    );
  }
  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }

  addService() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
        return;
    }
    const formData: FormData = new FormData();
    formData.append('filePath', this.fileToUpload);
    formData.append('descriptions', this.serviceForm.value.descriptions);
    formData.append('servicename', this.serviceForm.value.servicename);

    this.api.addService(formData).subscribe(response => {
      console.log(response);
      if(response.id != ''){
        this.toastr.success('Service/Production added successfully.');
        this.submitted = false;
        this.serviceForm.reset();
        this.getServices();
      }else{
          this.toastr.error('Error! While adding Service/Production.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  editService(service){
    this.serviceForm = this.formBuilder.group({
      servicename: [service.servicename, [Validators.required]],
      descriptions: [service.descriptions, [Validators.required]],
      id:[service.id]
    });
    this.edit = true;
    window.scroll(0,0);  
  }
  
  updateService(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.serviceForm.invalid) {
        return;
    }

    const formData: FormData = new FormData();
    formData.append('Image', this.fileToUpload);
    formData.append('service', this.serviceForm.value);

    this.api.updateService(formData).subscribe(response => {
      console.log(response);
      if(response.id != ''){
        this.toastr.success('Service/Production updated successfully.');
        this.submitted = false;
        this.edit = false;
        this.serviceForm.reset();
        this.getServices();
      }else{
          this.toastr.error('Error! While updating Service/Production.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  confirmDelete(id){
    if(confirm("Are you sure to delete this item.")) {
      this.api.deleteMachinaryBank(id).subscribe(response => {
        console.log(response);
        if(response == true){
          this.toastr.success('Service/Production Deleted successfully.');
          this.getServices();
        }else{
            this.toastr.error('Error! While Deleting Service/Production.');
        }
      },
        err => {
          console.log(err)
        }
      );
    }
  }
  
  resetForm(){
    this.serviceForm.reset();
  }

  get formControls(){
    return this.serviceForm.controls;
  }
}
