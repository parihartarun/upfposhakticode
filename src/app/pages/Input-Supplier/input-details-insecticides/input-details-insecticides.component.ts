import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-insecticides',
  templateUrl: './input-details-insecticides.component.html',
  styleUrls: ['./input-details-insecticides.component.css']
})
export class InputDetailsInsecticidesComponent implements OnInit {
  insecttypelist: any;
  insecticidedetails: any;
  insectForm:FormGroup;
  submitted = false;
  fileToUpload: File = null;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  input_supplier_id: string;
  inputid: string;

  constructor(private inputinsectservice: InputSupplierService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.types();



    this.insectForm = this.fb.group({
      cib_rc_issuedate: [''],
      cib_rc_number: [''],
      insecticide_type_id: ['', Validators.required],
      file:[''],
      manufacturer_name:[''],
      quantity:[''],
      input_supplier_id:localStorage.getItem('masterId')
      
    })
    this.inputid = localStorage.getItem('masterId')

    this.getallinsecticidesdata();

  }


  types() {
    this.inputinsectservice.insecttypes().subscribe((res) => {
      this.insecttypelist = res;
      console.log(res, "type");
    })
  }


  getallinsecticidesdata() {
    this.inputid = localStorage.getItem('masterId')
   
 this.inputinsectservice.getallinsecticide(this.inputid).subscribe((res) => {
      this.insecticidedetails = res;
      console.log(this.insecticidedetails,"")
    })
  }


  addinsecticides()
  {
    // this.submitted = true;
    // const formData: FormData = new FormData();
    // formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
    //  formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
    //  formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
    //  formData.append('quantity', this.insectForm.value.quantity);
    //  formData.append('file', this.fileToUpload);
   

    // formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    // this.inputinsectservice.addinsecticide(formData).subscribe(response => {
    //   if (response!= '') {
    //     this.toastr.success('Added Succefully.');
    //     this.submitted = false;
    //     // this.edit = false;
    //     this.insectForm.reset();
    //     this.getallinsecticidesdata();
    //   } else {
    //     this.toastr.error('Error! .');
    //   }
    // });

    this.insectForm.markAllAsTouched();
    if (this.insectForm.valid) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
      formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
      formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
      formData.append('manufacturer_name',this.insectForm.value.manufacturer_name)
      formData.append('quantity', this.insectForm.value.quantity);
      this.inputinsectservice.addinsecticide(formData);
      this.insectForm.reset();
    }

  }

  get formControls() {
    return this.insectForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.insectForm.controls['file'].setValue('');
      return;
    }
    else {
    
      this.checkfileFormat = false;
    }
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

  deleteseeds(insect) {
    this.inputinsectservice.deleteinsecticide(insect.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');      
        this.getallinsecticidesdata();
      } else {
        this.toastr.error('Error!.');
      }    
    });
  }


}
