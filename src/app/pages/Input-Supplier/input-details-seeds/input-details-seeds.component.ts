import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-input-details-seeds',
  templateUrl: './input-details-seeds.component.html',
  styleUrls: ['./input-details-seeds.component.css']
})
export class InputDetailsSeedsComponent implements OnInit {
  getallSeeds: any;
  croplist: any;
  seedForm: FormGroup;
  submitted = false;
  fileToUpload: File = null;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;
  inputid: string;
  crop_id: any;
  varietylist: any;
  id = null;
  isEdit = false;

  constructor(private fb: FormBuilder,
    private inputsupplierseedservice: InputSupplierService,
    private fposervice: FpoService,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCropList();
    this.seedForm = this.fb.group({
      certification_no: [''],
      company: [''],
      crop_id: ['', Validators.required],
      file: ['', [Validators.required]],
      quantity: [''],
      valid_from: [''],
      valid_to: [''],
      variety_id: ['']
    })
    this.inputid = localStorage.getItem('masterId')

    this.allseeds();

  }

  getCropList() {
    this.fposervice.getCropList().subscribe((res) => {
      this.croplist = res;
      console.log(res, "croplist");
      this.crop_id = res.cropId
    })
  }

  selectcrops(e) {
    this.seedForm.controls['crop_id'].setValue(parseInt(e));
    this.fposervice.getCropVarietiesByCropId(e).subscribe(v => {
      this.varietylist = v;
      console.log(v, "variety");
    })
  }

  allseeds() {
    this.inputid = localStorage.getItem('masterId')
    this.inputsupplierseedservice.getallseeds(this.inputid).subscribe((res) => {
      this.getallSeeds = res;
      console.log(res, "seeddata");
    })
  }

  addseeds() {
    this.submitted = true;
    let model = this.seedForm.value;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('certification_no', this.seedForm.value.certification_no);
    formData.append('company', this.seedForm.value.company);
    formData.append('crop_id', this.seedForm.value.crop_id);
    formData.append('quantity', this.seedForm.value.quantity);
    formData.append('valid_from', this.seedForm.value.valid_from);
    formData.append('valid_to', this.seedForm.value.valid_to);
    formData.append('variety_id', this.seedForm.value.variety_id);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputsupplierseedservice.addseed(formData).subscribe(response => {
      if (response != '') {
        this.toastr.success('seeds Added Succefully.');
        this.submitted = false;
        this.isEdit = false;
        this.seedForm.reset();
        this.allseeds();
      } else {
        this.toastr.error('Error! While Add seeds.');
      }
    });
  }

  editseed(data) {
    this.seedForm.get('file').patchValue(data.file);
    this.seedForm.get('certification_no').patchValue(data.certification_number);
    this.seedForm.get('company').patchValue(data.company_brand);
    this.seedForm.get('quantity').patchValue(data.quantity);
   this.seedForm.get('crop_id'). patchValue(data.crop_Id);
   this.seedForm.get('quantity'). patchValue(data.quantity);
   this.seedForm.get('valid_from'). patchValue(data.certification_valid_from);
   this.seedForm.get('valid_to'). patchValue(data.certification_valid_to);
   this.seedForm.get('variety_id'). patchValue(data.veriety_id);
    this.id = data.id;
    console.log(data);
    this.isEdit = true;
  }



  updatseed() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('certification_no', this.seedForm.value.certification_no);
    formData.append('company', this.seedForm.value.company);
    formData.append('crop_id', this.seedForm.value.crop_id);
    formData.append('quantity', this.seedForm.value.quantity);
    formData.append('valid_from', this.seedForm.value.valid_from);
    formData.append('valid_to', this.seedForm.value.valid_to);
     // formData.append('valid_from', splittedDatefrom[2]+'-' + splittedDatefrom[1] + '-' + splittedDatefrom[0]);
    // formData.append('valid_to', splittedDateto[2]+'-' + splittedDateto[1] + '-' + splittedDateto[0] );
    formData.append('variety_id', this.seedForm.value.variety_id);
    formData.append("input_supplier_id ", localStorage.getItem('masterId'))

    formData.append('id', this.id);
    this.inputsupplierseedservice.updateseed(this.id, formData).subscribe((res: any) => {
      if (res == true || res) {
        this.toastr.success(' updated successfully.');
        this.inputsupplierseedservice.getallseeds(this.id);
        this.seedForm.reset();
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
      this.seedForm.controls['file'].setValue('');
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

  deleteseeds(seed) {
    this.inputsupplierseedservice.deleteseed(seed.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.allseeds();
      } else {
        this.toastr.error('Error! While Add seed.');
      }
    });
  }

}
