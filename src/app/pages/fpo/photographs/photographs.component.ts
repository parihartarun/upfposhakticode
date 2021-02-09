import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-photographs',
  templateUrl: './photographs.component.html',
  styleUrls: ['./photographs.component.css']
})
export class PhotographsComponent implements OnInit {

  photographForm: FormGroup;
  submitted = false;
  photographs:Array<any>=[];
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
    this.photographForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      file: ['', [Validators.required]],
      id:['']
    });
    this.getPhotographs(); 
  }

  getPhotographs(){
    console.log('get phto call')
    // this.photographs = [
    //   { 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },{ 
    //     description:'Image 1',
    //     file:'sed.jpg'
    //   },
    // ]

    this.api.getPhotographs().subscribe(response => {
      console.log('getting photo list ===>', response);
      this.photographs = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  addPhotograph() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.photographForm.invalid) {
        return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description', this.photographForm.value.description);

    this.api.addPhotograph(formData).subscribe(response => {
      console.log(response);
      if(response.id != ''){
        this.toastr.success('Photographs added successfully.');
        this.submitted = false;
        this.photographForm.reset();
        this.getPhotographs();
      }else{
          this.toastr.error('Error! While adding Photographs.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  editPhotograph(service){
    // debugger;
    console.log('service===>',service)
    this.photographForm = this.formBuilder.group({
      // service_name: [service.service_name, [Validators.required]],
      // description: [service.description, [Validators.required]],
      description: [service.description, [Validators.required]],
      file: [service.file, [Validators.required]],
      id:[service.id]
    });

    // this.photographForm = this.formBuilder.group({
    //   id: [service.id],
    //   file: [service.file, Validators.required],
    //   description: [service.description, Validators.required]
    // });

    this.photographForm.controls['file'].patchValue(service.file);
    this.photographForm.get('description').patchValue(service.description);  

    this.edit = true;
    window.scroll(0,0);  
  }

  updatePhotograph(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.photographForm.invalid) {
        return;
    }

    const formData: FormData = new FormData();
    // formData.append('Image', this.fileToUpload);
    // formData.append('data', this.photographForm.value);

    formData.append('file', this.fileToUpload);
    formData.append('description', this.photographForm.value);

    this.api.updatePhotograph(formData).subscribe(response => {
      console.log('update file', response);
      if(response.id != ''){
        this.toastr.success('Photographs updated successfully.');
        this.submitted = false;
        this.edit = false;
        this.photographForm.reset();
        this.getPhotographs();
      }else{
          this.toastr.error('Error! While updating Photographs.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  confirmDelete(id) {
    if(confirm("Are you sure to delete this item.")) {
      this.api.deletePhotograph(id).subscribe(response => {
        console.log(response);
        if(response == true || response){
          this.toastr.success('Photographs Deleted successfully.');
          this.getPhotographs();
        }else {
            this.toastr.error('Error! While Deleting Photographs.');
        }
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  resetForm(){
    this.photographForm.reset();
  }

  get formControls(){
    return this.photographForm.controls;
  }

}
