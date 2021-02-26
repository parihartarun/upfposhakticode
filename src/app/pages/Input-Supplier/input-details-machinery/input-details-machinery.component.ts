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
  machineryForm:FormGroup;
  uploadSuccess: boolean;
  fileToUpload: File = null;
  isViewComplaint = false;
  submitted = false;
  checkfileFormat: boolean = false;
  myInputVariable: ElementRef;

  constructor(private inputmachineryservice : InputSupplierService,
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
      input_supplier_id : localStorage.getItem('masterId'),
  });
  }


  mtype()
  {
    this.inputmachineryservice.mtype().subscribe((res)=>{
      this.mtypes = res;
    })
  }

 Machinerydata()
 {
   this.inputid = localStorage.getItem('masterId')
   this.inputmachineryservice.getallMachinery(this.inputid).subscribe((res)=>{
   this.machinerydetails = res;
  })
 }



 addmachinery()
 {
  this.submitted = true;
  let model = this.machineryForm.value;
  const formData: FormData = new FormData();
  // formData.append('file', this.fileToUpload);  
  // formData.append('machinery_name_id', this.machineryForm.value.machinery_name_id);
  // formData.append('manufacturer_name', this.machineryForm.value.manufacturer_name);
  // formData.append('mchinery_type_id', this.machineryForm.value.mchinery_type_id);
  // formData.append('quantity',this.machineryForm.value.quantity);
  // formData.append("input_supplier_id ", localStorage.getItem('masterId'))
  this.inputmachineryservice.addMachinery(model).subscribe(res => {
    console.log(res)
    if (res!= '') {
      this.toastr.success(' Added Succefully.');
      this.submitted = false;
      // this.edit = false;
      this.machineryForm.reset();
      this.Machinerydata();
    } else {
      this.toastr.error('Error!.');
    }
  });
}
 



upload(files: FileList) {
  this.fileToUpload = files.item(0);
  if (!this.validateFile(files[0].name)) {
    this.checkfileFormat = true;
    this.myInputVariable.nativeElement.value = "";
    this.machineryForm.controls['uploadFile'].setValue('');
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
deleteCompliant(mach) {
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