import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  p:number = 1;
  userRole: string;

  constructor(private inputinsectservice: InputSupplierService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.types();
    this.getallinsecticidesdata();
    this.inputid = localStorage.getItem('masterId');
    this.userRole = localStorage.getItem('userRole');
    this.insectForm = this.fb.group({
      cib_rc_issuedate: [''],
      cib_rc_number: [''],
      insecticide_type_id: ['', [Validators.required]],
      file: [''],
      manufacturer_name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
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
    this.inputinsectservice.getallinsecticide().subscribe((res) => {
      this.insecticidedetails = res;
      console.log(this.insecticidedetails, "")
    })
  }


  addinsecticides() {
    console.log('>>>role', this.userRole);
    
   if(this.userRole == 'ROLE_FPC'){
    this.submitted = true;
    if (this.insectForm.invalid) {
      return;
    }     
    let model = this.insectForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
    formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
    formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
    formData.append('quantity', this.insectForm.value.quantity);
    formData.append('manufacturer_name', this.insectForm.value.manufacturer_name);
    formData.append('role', localStorage.getItem('roleRefId'));
    formData.append("vendor_id", localStorage.getItem('masterId'));
    this.inputinsectservice.addFpoInsecticide(formData).subscribe(res => {
      this.toastr.success('Insecticide/Pesticide Added Successfully.');
      this.submitted = false;
      this.insectForm.reset();
      this.getallinsecticidesdata();
    });
   }else{
    this.submitted = true;
    if (this.insectForm.invalid) {
      return;
    }     
    let model = this.insectForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('cib_rc_issuedate', this.insectForm.value.cib_rc_issuedate);
    formData.append('cib_rc_number', this.insectForm.value.cib_rc_number);
    formData.append('insecticide_type_id', this.insectForm.value.insecticide_type_id);
    formData.append('quantity', this.insectForm.value.quantity);
    formData.append('manufacturer_name', this.insectForm.value.manufacturer_name);
    formData.append("vendor_id ", localStorage.getItem('masterId'));
    formData.append("role ", localStorage.getItem('roleRefId'))

    this.inputinsectservice.addinsecticide(formData).subscribe(res => {
      this.toastr.success('Insecticide/Pesticide Added Successfully.');
      this.submitted = false;
      this.insectForm.reset();
      this.getallinsecticidesdata();
    });
   }
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
    formData.append("vendor_id ", localStorage.getItem('masterId'))

    formData.append('id', this.id);
    this.inputinsectservice.updateinsecticide(this.id, formData).subscribe((res: any) => {
      this.toastr.success('Insecticide/Pesticide Updated Successfully.');
      this.insectForm.reset();
      this.isEdit = false;
      this.getallinsecticidesdata();
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
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "jpg") {
      return true;
    }
    else {
      return false;
    }
  }

  confirmDelete(id) {
    if (confirm("Are you sure to delete this item.")) {
      this.inputinsectservice.deleteinsecticide(id).subscribe(response => {
        this.toastr.success('Insecticide/Pesticide Deleted Successfully.');
        this.getallinsecticidesdata();
      },
        err => {
          console.log(err)
        }
      );
    }
  }


  get formControls() {
    return this.insectForm.controls;
  }

  resetForm(){
    this.insectForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }
}
