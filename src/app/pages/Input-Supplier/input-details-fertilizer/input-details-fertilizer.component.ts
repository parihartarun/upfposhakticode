import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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


  constructor(private fb: FormBuilder,
    private inputsupplierfertiservice: InputSupplierService,
    private fposervice: FpoService,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fertilizertype();
    this.Getallfertilizer();
    this.inputid = localStorage.getItem('masterId')
    this.fertilizerForm = this.fb.group({
      fertilizer_grade: [''],
      type_id: [''],
      file: [''],
      manufacturer_name: [''],
      name_id: [''],
      input_supplier_id: localStorage.getItem('masterId'),

    });


  }

  selectvalue(type) {
    console.log(type);
    this.fertitype = type;

    this.fertilizerForm.controls['type_id'].setValue(parseInt(type));
    this.inputsupplierfertiservice.fsubtype(type).subscribe(v => {
      this.subtype = v;
    })

  }
  selectedtype(e) {
    console.log(e);
    this.subtype = e
  }

  ChangingtypeValue(e) {
    console.log(e);
  }


  Getallfertilizer() {
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
    let model = this.fertilizerForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('fertilizer_grade', this.fertilizerForm.value.fertilizer_grade);
    formData.append('manufacturer_name', this.fertilizerForm.value.manufacturer_name);
    formData.append('type_id', this.fertilizerForm.value.type_id);
    formData.append('name_id', this.fertilizerForm.value.name_id);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputsupplierfertiservice.addfertilizer(formData).subscribe(res => {
      if (res != '') {
        this.toastr.success(' Added Successfully.');
        this.submitted = false;
        this.isEdit = false;
        this.fertilizerForm.reset();
        this.Getallfertilizer();
      } else {
        this.toastr.error('Error!.');
      }
    });
  }

  editfertilizer(data) {
    this.fertilizerForm.get('fertilizer_grade').patchValue(data.fertilizer_grade);
    this.fertilizerForm.get('file').patchValue(data.file);
    this.fertilizerForm.get('type_id').patchValue(data.type_id);
    this.fertilizerForm.get('name_id').patchValue(data.name_id);
    // this.fertilizerForm.get('manufacturer_name').patchValue(data.manufacturer_name);
    // this.fertilizerForm.get('type_id').patchValue(data.fertilizer_type);
    // this.fertilizerForm.get('fertilizerType').patchValue(data.type_id);
    this.fertilizerForm.get('name_id').patchValue(data.fertilizer_name);
    this.id = data.id;
    console.log(data);
    this.isEdit = true;
  }

  updatefertilizer() {
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
        this.Getallfertilizer();
        // this.inputsupplierfertiservice.getallMachinery(this.id);
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
  deletefertilizer(mach) {
    this.inputsupplierfertiservice.deletefertilizer(mach.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.Getallfertilizer();
      } else {
        this.toastr.error('Error!.');
      }
    });
  }




}
