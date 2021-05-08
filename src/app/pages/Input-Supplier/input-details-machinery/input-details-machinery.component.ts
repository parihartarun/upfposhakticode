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
  fileToEdit:string;
  filePathToEdit:string;
  goveScheme = 0;

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
    if(this.userRole == 'ROLE_CHCFMB'){
      this.machineryForm = this.fb.group({
        manufacturer_name: [''],
        quantity: ['', [Validators.required]],
        file: [''],
        machinery_name_id: ['', [Validators.required]],
        machinery_type_id: ['', [Validators.required]],
        input_supplier_id: localStorage.getItem('masterId'),
        specification: [''],
        rent_per_day:['', [Validators.required]],
        isGovernmentAssistance:['', Validators.required],
        govt_scheme:['']
      });
    }else{
      this.machineryForm = this.fb.group({
        manufacturer_name: [''],
        quantity: ['', [Validators.required]],
        file: [''],
        machinery_name_id: ['', [Validators.required]],
        machinery_type_id: ['', [Validators.required]],
        input_supplier_id: localStorage.getItem('masterId'),
        specification: [''],
        rent_per_day:[''],
        isGovernmentAssistance:['', Validators.required],
        govt_scheme:['']
      });
    }
    
  }

  updateGovernmentScheme(val){
    this.goveScheme =  val;
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
    this.inputmachineryservice.getallMachinery().subscribe((res) => {
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
    formData.append('machinery_type_id', this.machineryForm.value.machinery_type_id);
    formData.append('quantity', this.machineryForm.value.quantity);
    formData.append('specification', this.machineryForm.value.specification);
    formData.append("vendor_id", localStorage.getItem('masterId'));
    formData.append("role ", localStorage.getItem('roleRefId'));
    formData.append('rent_per_day', this.machineryForm.value.rent_per_day);
    formData.append('gove_scheme', this.machineryForm.value.gove_scheme);

    this.inputmachineryservice.addMachinery(formData).subscribe(res => {
      if (res != '') {
        this.toastr.success('Machinery/Equipment Added Successfully.');
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
      formData.append('machinery_type_id', this.machineryForm.value.machinery_type_id);
      formData.append('quantity', this.machineryForm.value.quantity);
      formData.append('specification', this.machineryForm.value.specification);
      formData.append("input_supplier_id ", localStorage.getItem('masterId'));
      formData.append("role ", localStorage.getItem('roleRefId'));
      formData.append("vendor_id", localStorage.getItem('masterId'));
      formData.append('rent_per_day', this.machineryForm.value.rent_per_day);
      formData.append('gove_scheme', this.machineryForm.value.gove_scheme);

      this.inputmachineryservice.addFPOMachinery(formData).subscribe(res => {
        if (res != '') {
          this.toastr.success('Machinery/Equipment Added Successfully.');
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
    console.log(data);
    this.isEdit = true;
    this.id = data.id;
    if(data.file_path != null){
      var pathParts = data.file_path.split("/");
      this.fileToEdit = pathParts[pathParts.length - 1];
      this.filePathToEdit = data.file_path;
    }
    this.selectmachinaryname(data.type_id);
    this.machineryForm.get('file').patchValue(data.file);
    this.machineryForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    this.machineryForm.get('machinery_type_id').patchValue(data.type_id);
    this.machineryForm.get('quantity').patchValue(data.quantity);
    this.machineryForm.get('specification').patchValue(data.technical_specs);
    this.machineryForm.get('rent_per_day').patchValue(data.rent_per_day);
    if(data.gove_scheme != ''){
      this.machineryForm.get('isGovernmentAssistance').patchValue(true);
      this.machineryForm.get('govt_scheme').patchValue(data.gove_scheme);
    }
    setTimeout(() => {
      this.machineryForm.patchValue({
       'machinery_name_id':data.name_id
      });
    }, 2000);
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
    formData.append('machinery_type_id', this.machineryForm.value.machinery_type_id);
    formData.append('quantity', this.machineryForm.value.quantity);
    formData.append('specification', this.machineryForm.value.specification);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    formData.append('id', this.id);

    this.inputmachineryservice.updateMachinery(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Machinery/Equipment Updated Successfully.');
        this.Machinerydata();
        this.resetForm();
      } else {
        this.toastr.error('Something Went Wrong.');
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
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == "jpeg" || ext.toLowerCase() == "jpg") {
      return true;
    }
    else {
      return false;
    }
  }

  confirmDelete(id) {
    if (confirm("Are you sure to delete this item.")) {
      this.inputmachineryservice.deleteMachinery(id).subscribe(response => {
        this.toastr.success('Machinery/Equipment Deleted Successfully.');
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