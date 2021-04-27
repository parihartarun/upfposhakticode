import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-seeds',
  templateUrl: './input-details-seeds.component.html',
  styleUrls: ['./input-details-seeds.component.css']
})
export class InputDetailsSeedsComponent implements OnInit {
  seeds: any;
  croplist: any;
  seedForm: FormGroup;
  submitted = false;
  fileToUpload: File = null;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  crop_id: any;
  varietylist: any;
  id = null;
  isEdit = false;
  p:number=1;
  userRole: string;
  inputid: any;

  constructor(private fb: FormBuilder,
    private api: InputSupplierService,
    private fposervice: FpoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCropList();
    this.getAllSeeds();
    this.inputid = localStorage.getItem('masterId');
    this.userRole = localStorage.getItem('userRole');
    this.seedForm = this.fb.group({
      crop_id: ['', Validators.required],
      file: [''],
      quantity: ['', Validators.required],
      variety_id: ['', Validators.required],
      certification_no: [''],
      company: [''],
      valid_from: [''],
      valid_to: [''],
    })
  }

  getCropList() {
    this.fposervice.getCropList().subscribe((res) => {
      this.croplist = res;
    })
  }

  selectCrops(crop_id) {
    this.fposervice.getCropVarietiesByCropId(crop_id).subscribe(res => {
      this.varietylist = res;
    })
  }

  getAllSeeds() {
    console.log('>>>masterid', localStorage.getItem('masterId'));
    
    this.api.getAllSeeds().subscribe((res) => {
      this.seeds = res;
      console.log(res, "seeddata");
    })
  }

  addseeds() {
    console.log('>>>role', this.userRole);
    if(this.userRole == 'ROLE_FPC'){
      this.submitted = true;
    if (this.seedForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('certification_no', this.seedForm.value.certification_no);
    formData.append('company', this.seedForm.value.company);
    formData.append('crop_id', this.seedForm.value.crop_id);
    formData.append('quantity', this.seedForm.value.quantity);
    formData.append('valid_from', this.seedForm.value.valid_from);
    formData.append('valid_to', this.seedForm.value.valid_to);
    formData.append('variety_id', this.seedForm.value.variety_id);
    formData.append('role', localStorage.getItem('roleRefId'));
    formData.append("vendor_id", localStorage.getItem('masterId'));
    this.api.addFpoSeed(formData).subscribe(response => {
        this.toastr.success('Seeds Added Successfully.');
        this.submitted = false;
        this.isEdit = false;
        this.seedForm.reset();
        this.getAllSeeds();
    });
    }else{
      this.submitted = true;
    if (this.seedForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('certification_no', this.seedForm.value.certification_no);
    formData.append('company', this.seedForm.value.company);
    formData.append('crop_id', this.seedForm.value.crop_id);
    formData.append('quantity', this.seedForm.value.quantity);
    formData.append('valid_from', this.seedForm.value.valid_from);
    formData.append('valid_to', this.seedForm.value.valid_to);
    formData.append('variety_id', this.seedForm.value.variety_id);
    formData.append("vendor_id ", localStorage.getItem('masterId'))
    this.api.addseed(formData).subscribe(response => {
        this.toastr.success('Seeds Added Successfully.');
        this.submitted = false;
        this.isEdit = false;
        this.seedForm.reset();
        this.getAllSeeds();
    });
    }
  }

  editseed(data) {
    this.selectCrops(data.crop_Id);
    this.seedForm.get('file').patchValue(data.file);
    this.seedForm.get('certification_no').patchValue(data.certification_number);
    this.seedForm.get('company').patchValue(data.company_brand);
    this.seedForm.get('quantity').patchValue(data.quantity);
    this.seedForm.get('crop_id'). patchValue(data.crop_Id);
    this.seedForm.get('quantity'). patchValue(data.quantity);
    this.seedForm.get('valid_from'). patchValue(data.certification_valid_from);
    this.seedForm.get('valid_to'). patchValue(data.certification_valid_to);
    this.seedForm.get('variety_id'). patchValue(data.veriety_id);
    setTimeout(() => {
      this.seedForm.get('variety_id'). patchValue(data.veriety_id);
    }, 1000);
    this.id = data.id;
    console.log(data);
    this.isEdit = true;
  }

  updatseed() {
    this.submitted = true;
    if (this.seedForm.invalid) {
      return;
    }
    console.log(this.seedForm.value);
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('certification_no', this.seedForm.value.certification_no);
    formData.append('company', this.seedForm.value.company);
    formData.append('crop_id', this.seedForm.value.crop_id);
    formData.append('quantity', this.seedForm.value.quantity);
    formData.append('valid_from', this.seedForm.value.valid_from);
    formData.append('valid_to', this.seedForm.value.valid_to);
    formData.append('variety_id', this.seedForm.value.variety_id);
    formData.append("vendor_id ", localStorage.getItem('masterId'))
    formData.append('id', this.id);
    this.api.updateseed(this.id, formData).subscribe((res: any) => {
        this.submitted = false;
        this.toastr.success('Seeds Updated Successfully.');
        this.getAllSeeds();
        this.seedForm.reset();
        this.isEdit = false;
    })
  }

  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.seedForm.controls['file'].setValue('');
      return;
    }
    else {
      this.checkfileFormat = false;
    }
  }

  validateFile(name: String){
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
      this.api.deleteseed(id).subscribe(response => {
        this.toastr.success('Seeds Deleted Successfully.');
        this.getAllSeeds();
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  get formControls() {
    return this.seedForm.controls;
  }

  resetForm(){
    this.seedForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }

}
