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
  // districts = [];
  // blocks = [];

  constructor( private fb: FormBuilder,
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
      file:['',[Validators.required]],
      quantity:[''],
      valid_from:[''],
      valid_to:[''],
      variety_id:['']
    })
    inputid: localStorage.getItem('masterId')

    this.allseeds();

  }

  getCropList() {
    this.fposervice.getCropList().subscribe((res) => {
      this.croplist = res;
      console.log(res, "croplist");


      // this.fposervice.getCropVarietiesByCropId(res.cropId).subscribe(v => {
      //   console.log(v,"variety");
      // })
  
    })
  }



  selectcrops(crop_id: any) {
    this.seedForm.controls['cropId'].setValue(parseInt(crop_id.currentTarget.value));
    this.fposervice.getCropVarietiesByCropId(parseInt(crop_id.currentTarget.value)).subscribe(v => {
      console.log(v,"variety");
    })
  }
  // selectBlock(blockId: any) {
  //   this.fposervice.getGramPanchayat(parseInt(blockId.currentTarget.value)).subscribe(gp => {
  //     this.panchayts = gp
  //   })
  //   this.registerForm.controls['blockRef'].setValue(blockId.currentTarget.value);
  // }


  allseeds() {
    this.inputsupplierseedservice.getallseeds().subscribe((res) => {
      this.getallSeeds = res;
      console.log(res, "seeddata");
    })
  }


  // createseedForm(){
  //   this.seedForm = this.fb.group({
  //     certification_no: [''],
  //     company: [''],
  //     crop_id: ['', Validators.required],
  //     file:[''],
  //     quantity:[''],
  //     valid_from:[''],
  //     valid_to:[''],
  //     variety_id:['']
  //   })
  // }


  addseeds()
  {
    this.submitted = true;
    if (this.seedForm.invalid) {
      return;
    }
    let model = this.seedForm.value;
    let issuetype = Number(this.seedForm.value.issueType) - 1;
    const formData: FormData = new FormData();
    formData.append('certification_no', this.seedForm.value.certification_no);
     formData.append('company', this.seedForm.value.company);
     formData.append('crop_id', this.seedForm.value.crop_id);
     formData.append('quantity', this.seedForm.value.quantity);
     formData.append('valid_from', this.seedForm.value.valid_from);
     formData.append('valid_to', this.seedForm.value.valid_to);
     formData.append('variety_id', this.seedForm.value.variety_id);

    formData.append("input_supplier_id ", localStorage.getItem('masterId'))
    this.inputsupplierseedservice.addseed(formData).subscribe(response => {
      if (response!= '') {
        this.toastr.success('seeds Added Succefully.');
        this.submitted = false;
        // this.edit = false;
        this.seedForm.reset();
        this.getallSeeds();
      } else {
        this.toastr.error('Error! While Add seeds.');
      }
    });
  }

  get formControls() {
    return this.seedForm.controls;
  }
  upload(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.validateFile(files[0].name)) {
      this.checkfileFormat = true;
      this.myInputVariable.nativeElement.value = "";
      this.seedForm.controls['uploadFile'].setValue('');
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

  deleteseeds(seed) {
    this.inputsupplierseedservice.deleteseed(seed.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');      
        this.getallSeeds();
      } else {
        this.toastr.error('Error! While Add seed.');
      }    
    });
  }

}
