import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';


@Component({
  selector: 'app-input-details-fertilizer',
  templateUrl: './input-details-fertilizer.component.html',
  styleUrls: ['./input-details-fertilizer.component.css']
})
export class InputDetailsFertilizerComponent implements OnInit {
  fertitype: any;
  subtype: any;
  subtypes: any;
  checked: boolean = false;
  // selected: boolean = false;
  selectedvalue: any;
  chemicalchecked: boolean;
  biochecked: boolean;
  organicchecked: boolean;
  fertilizerDetails: any;
  inputid: string;
  fertilizertypelist: any;
  fertilizerForm: FormGroup;
  uploadSuccess: boolean;
  fileToUpload: File = null;
  isViewComplaint = false;
  submitted = false;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  id = null;
  isEdit = false;
  p:number = 1;  


  constructor(private fb: FormBuilder,
    private inputsupplierfertiservice: InputSupplierService,
    private fposervice: FpoService,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fertilizertype();
    this.getallfertilizer();
    this.inputid = localStorage.getItem('masterId')
    this.fertilizerForm = this.fb.group({
      fertilizer_grade: ['', [Validators.required]],
      type_id: ['', [Validators.required]],
      file: [''],
      manufacturer_name: ['', [Validators.required]],
      name_id: ['', [Validators.required]],
      input_supplier_id: localStorage.getItem('masterId'),
    });
  }

  selectFertilizerType(type, name_id = null) {
    console.log(type);
    this.fertitype = type;
    this.fertilizerForm.controls['type_id'].setValue(parseInt(type));
    this.inputsupplierfertiservice.fsubtype(type).subscribe(v => {
      console.log(v, name_id);
      this.subtypes = v;
      if(name_id != null){
        console.log(name_id);
        this.fertilizerForm.patchValue({
          name_id: name_id
        });
      }else if(name_id == 0){
        this.subtype = 'other';
      }
    })
  }

  selectedtype(e) {
    console.log(e);
    this.subtype = e
  }

  ChangingtypeValue(e) {
    console.log(e);
  }

  getallfertilizer() {
    this.inputid = localStorage.getItem('masterId')
    this.inputsupplierfertiservice.getallfertilizer(this.inputid).subscribe((res) => {
      console.log(res);
      this.fertilizerDetails = res;
    })
  }

  fertilizertype() {
    this.inputsupplierfertiservice.ftype().subscribe((res) => {
      this.fertilizertypelist = res;
      console.log(res)
    })
  }

  addfertilizer() {
    this.submitted = true;
    if (this.fertilizerForm.invalid) {
      return;
    }    
    let model = this.fertilizerForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('fertilizer_grade', this.fertilizerForm.value.fertilizer_grade);
    formData.append('manufacturer_name', this.fertilizerForm.value.manufacturer_name);
    formData.append('type_id', this.fertilizerForm.value.type_id);
    formData.append('name_id', this.fertilizerForm.value.name_id);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputsupplierfertiservice.addfertilizer(formData).subscribe(res => {
      this.toastr.success('Added Successfully.');
      this.submitted = false;
      this.isEdit = false;
      this.fertilizerForm.reset();
      this.getallfertilizer();
    });
  }

  editfertilizer(data) {
    console.log(data);
    this.selectFertilizerType(data.type_id, data.name_id);
    this.fertilizerForm.get('fertilizer_grade').patchValue(data.fertilizer_grade);
    this.fertilizerForm.get('file').patchValue(data.file);
    this.fertilizerForm.get('type_id').patchValue(data.type_id);
    //this.fertilizerForm.get('name_id').patchValue(data.name_id);
    this.fertilizerForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    this.id = data.id;
    this.isEdit = true;
  }

  updatefertilizer() {
    this.submitted = true;
    if (this.fertilizerForm.invalid) {
      return;
    }  
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('fertilizer_grade', this.fertilizerForm.value.fertilizer_grade);
    formData.append('manufacturer_name', this.fertilizerForm.value.manufacturer_name);
    formData.append('type_id', this.fertilizerForm.value.type_id);
    formData.append('name_id', this.fertilizerForm.value.name_id);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    formData.append('id', this.id);
    this.inputsupplierfertiservice.updatefertilizer(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success('Fertilizer updated successfully.');
        this.getallfertilizer();
        this.fertilizerForm.reset();
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
      this.fertilizerForm.controls['file'].setValue('');
      return;
    }else {
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
      this.inputsupplierfertiservice.deletefertilizer(id).subscribe(response => {
        this.toastr.success('Record Deleted Successfully.');
        this.getallfertilizer();
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  get formControls() {
    return this.fertilizerForm.controls;
  }

  resetForm(){
    this.fertilizerForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }
}
