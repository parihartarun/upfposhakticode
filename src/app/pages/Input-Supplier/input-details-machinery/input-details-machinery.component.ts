import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-machinery',
  templateUrl: './input-details-machinery.component.html',
  styleUrls: ['./input-details-machinery.component.css']
})
export class InputDetailsMachineryComponent implements OnInit {
  machinerydetails: any;
  mtypes: any;
  inputid: string;
  machineryForm: FormGroup;
  uploadSuccess: boolean;
  fileToUpload: File = null;
  isViewComplaint = false;
  submitted = false;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  id = null;
  isEdit = false;
  machinerynamelist: any;
  p:number = 1;  
  userRole: string;

  constructor(private inputmachineryservice: InputSupplierService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.inputid = localStorage.getItem('masterId')
    this.mtype();
    this.Machinerydata();
    this.inputid = localStorage.getItem('masterId');
    this.userRole = localStorage.getItem('userRole');
    this.machineryForm = this.fb.group({
      manufacturer_name: [''],
      quantity: ['', [Validators.required]],
      file: ['', [Validators.required]],
      machinery_name_id: ['', [Validators.required]],
      mchinery_type_id: ['', [Validators.required]],
      input_supplier_id: localStorage.getItem('masterId'),
      specification: ['']
    });
  }

  mtype() {
    this.inputmachineryservice.mtype().subscribe((res) => {
      this.mtypes = res;
      console.log(res);
    })
  }

  selectmachinaryname(type_id) {
    this.inputmachineryservice.machineryname(type_id).subscribe(mn => {
      console.log(mn);
      this.machinerynamelist = mn;
    })
  }

  Machinerydata() {
    this.inputid = localStorage.getItem('masterId')
    this.inputmachineryservice.getallMachinery(this.inputid).subscribe((res) => {
      this.machinerydetails = res;
      console.log(res, "mdata");
    })
  }

  addmachinery() {
    console.log('>>>role', this.userRole);
    if(this.userRole == 'ROLE_FPC'){
      this.submitted = true;
    if (this.machineryForm.invalid) {
      return;
    }      
    let model = this.machineryForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('machinery_name_id', this.machineryForm.value.machinery_name_id);
    formData.append('manufacturer_name', this.machineryForm.value.manufacturer_name);
    formData.append('mchinery_type_id', this.machineryForm.value.mchinery_type_id);
    formData.append('quantity', this.machineryForm.value.quantity);
    formData.append('specification', this.machineryForm.value.specification);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputmachineryservice.addMachinery(formData).subscribe(res => {
      if (res != '') {
        this.toastr.success(' Added Succefully.');
        this.submitted = false;
        this.isEdit = false;
        this.machineryForm.reset();
        this.Machinerydata();
      } else {
        this.toastr.error('Error!.');
      }
    });

    }else{
      this.submitted = true;
      if (this.machineryForm.invalid) {
        return;
      }      
      let model = this.machineryForm.value;
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('machinery_name_id', this.machineryForm.value.machinery_name_id);
      formData.append('manufacturer_name', this.machineryForm.value.manufacturer_name);
      formData.append('mchinery_type_id', this.machineryForm.value.mchinery_type_id);
      formData.append('quantity', this.machineryForm.value.quantity);
      formData.append('specification', this.machineryForm.value.specification);
      formData.append("input_supplier_id ", localStorage.getItem('masterId'));
      formData.append("role ", localStorage.getItem('userRole'))
      this.inputmachineryservice.addFPOMachinery(formData).subscribe(res => {
        if (res != '') {
          this.toastr.success(' Added Succefully.');
          this.submitted = false;
          this.isEdit = false;
          this.machineryForm.reset();
          this.Machinerydata();
        } else {
          this.toastr.error('Error!.');
        }
      });
    }
    
  }

  editmachinery(data) {
    this.selectmachinaryname(data.type_id);
    this.machineryForm.get('file').patchValue(data.file);
    this.machineryForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    this.machineryForm.get('mchinery_type_id').patchValue(data.type_id);
    this.machineryForm.get('quantity').patchValue(data.quantity);
    this.machineryForm.get('specification').patchValue(data.technical_specs);
    setTimeout(() => {
      this.machineryForm.patchValue({
       'machinery_name_id':data.name_id
      });
    }, 1000);
    this.id = data.id;
    console.log(data,"meditdata");
    this.isEdit = true;
  }

  updatemachinery() {
    this.submitted = true;
    if (this.machineryForm.invalid) {
      return;
    }  
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('machinery_name_id', this.machineryForm.value.machinery_name_id);
    formData.append('manufacturer_name', this.machineryForm.value.manufacturer_name);
    formData.append('mchinery_type_id', this.machineryForm.value.mchinery_type_id);
    formData.append('quantity', this.machineryForm.value.quantity);
    formData.append('specification', this.machineryForm.value.specification);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))

    formData.append('id', this.id);
    this.inputmachineryservice.updateMachinery(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Machinery updated successfully.');
        this.Machinerydata();
        // this.inputmachineryservice.getallMachinery(this.id);
        this.machineryForm.reset();
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
      this.machineryForm.controls['file'].setValue('');
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

  confirmDelete(id) {
    if (confirm("Are you sure to delete this item.")) {
      this.inputmachineryservice.deleteMachinery(id).subscribe(response => {
        this.toastr.success('Record Deleted Successfully.');
        this.Machinerydata();
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  get formControls() {
    return this.machineryForm.controls;
  }

  resetForm(){
    this.machineryForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }
}