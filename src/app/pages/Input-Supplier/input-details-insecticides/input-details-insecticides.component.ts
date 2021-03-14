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
  insectForm: FormGroup;
  submitted = false;
  fileToUpload: File = null;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  input_supplier_id: string;
  inputid: string;
  id = null;
  isEdit = false;

  constructor(private inputinsectservice: InputSupplierService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.types();
    this.getallinsecticidesdata();

    this.insectForm = this.fb.group({
      cib_rc_issuedate: [''],
      cib_rc_number: [''],
      insecticide_type_id: [''],
      file: [''],
      manufacturer_name: [''],
      quantity: [''],
      input_supplier_id: localStorage.getItem('masterId')

    })
   
  }


  types() {
    this.inputinsectservice.insecttypes().subscribe((res) => {
      this.insecttypelist = res;
      console.log(res, "type");
    })
  }


  getallinsecticidesdata() {
  
    this.inputinsectservice.getallinsecticide(localStorage.getItem('masterId')).subscribe((res) => {
      this.insecticidedetails = res;
      console.log(this.insecticidedetails, "")
    })
  }


  addinsecticides() {
    this.submitted = true;
    let model = this.insectForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
    formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
    formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
    formData.append('quantity', this.insectForm.value.quantity);
    formData.append('manufacturer_name', this.insectForm.value.manufacturer_name);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputinsectservice.addinsecticide(formData).subscribe(res => {
      if (res != '') {
        this.toastr.success(' Added Succefully.');
        this.submitted = false;
        // this.edit = false;
        this.insectForm.reset();
        this.getallinsecticidesdata();
      } else {
        this.toastr.error('Error!.');
      }
    });
  }



  editinsect(data) {
    this.insectForm.get('insecticide_type_id').patchValue(data.type_id);
    this.insectForm.get('file').patchValue(data.file);
    this.insectForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    this.insectForm.get('cib_rc_issuedate').patchValue(data.cib_rc_issuedate);
    this.insectForm.get('quantity').patchValue(data.quantity);
    this.insectForm.get('cib_rc_number').patchValue(data.cib_rc_no);
    this.id = data.id;
    console.log(data);  
    this.isEdit = true;
  }



  updatinsect() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
    formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
    formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
    formData.append('quantity', this.insectForm.value.quantity);
    formData.append('manufacturer_name', this.insectForm.value.manufacturer_name);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))

    formData.append('id', this.id);
    this.inputinsectservice.updateinsecticide(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success(' updated successfully.');
        this.inputinsectservice.getallMachinery(this.id);
        this.insectForm.reset();
        this.isEdit = false;
      } else {
        this.toastr.error('Something went wrong.');
      }
    })
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
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "pdf") {
      return true;
    }
    else {
      return false;
    }
  }

  deleteinsect(insect) {
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
