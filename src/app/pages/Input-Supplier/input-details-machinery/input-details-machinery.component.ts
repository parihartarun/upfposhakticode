import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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


    this.machineryForm = this.fb.group({
      manufacturer_name: [''],
      quantity: [''],
      file: [''],
      machinery_name_id: [''],
      mchinery_type_id: [''],
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


  selectmachinaryname(e) {
    this.machineryForm.controls['mchinery_type_id'].setValue(parseInt(e));
    this.inputmachineryservice.machineryname(e).subscribe(mn => {
      this.machinerynamelist = mn;
      console.log(mn, "machineryname");
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
    this.submitted = true;
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
  }

  editmachinery(data) {
    this.machineryForm.get('machinery_name_id').patchValue(data.name_id);
    this.machineryForm.get('file').patchValue(data.file);
    this.machineryForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    this.machineryForm.get('mchinery_type_id').patchValue(data.type_id);
    this.machineryForm.get('quantity').patchValue(data.quantity);
    this.machineryForm.get('specification').patchValue(data.specification);
    this.id = data.id;
    console.log(data,"meditdata");
    this.isEdit = true;
  }

  updatemachinery() {
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
  deletemachinery(mach) {
    this.inputmachineryservice.deleteMachinery(mach.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.Machinerydata();
      } else {
        this.toastr.error('Error!.');
      }
    });
  }


}