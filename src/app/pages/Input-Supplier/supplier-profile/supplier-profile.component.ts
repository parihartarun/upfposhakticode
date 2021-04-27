import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.css']
})
export class SupplierProfileComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  districts = [];
  blocks = [];
  villages = [];
  inputSupplierData: any;
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]

  constructor(private fb: FormBuilder,
    private api: AuthService,
    private supplierService: InputSupplierService,
    private _router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d;
      
    })
    this.profileForm = this.fb.group({
      inputSupplierName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      contact_person: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      inputSupplierType: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      distRefId: ['', Validators.required],
      blockRefId: ['', Validators.required],
      villageRefId:[''],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      gstNumber: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{0,100}")]],
      license_number: ['', Validators.required],
      inputSupplierId: ['']      ,
    })
    this.getSupplierProfileData();
  }


  getSupplierProfileData(){
    this.supplierService.getSupplierProfileData(localStorage.getItem('masterId')).subscribe(response => {
      this.inputSupplierData  = response.inputSupplier;
      
      this.api.getBlock(this.inputSupplierData.district_id).subscribe(block => {
        this.blocks = block
      })
      this.api.getVillageByBlock(this.inputSupplierData.block_id).subscribe(v => {
        this.villages = v
      })

      // this.selectDistrict(this.inputSupplierData.district_id);
      // this.selectBlock(this.inputSupplierData.block_id);
      // this.selectVillage(this.inputSupplierData.villageRefId)
     console.log(response.inputSupplier);
      this.profileForm.patchValue({
        inputSupplierId: this.inputSupplierData.input_supplier_id,
        inputSupplierName: this.inputSupplierData.input_supplier_name,
        inputSupplierType: this.inputSupplierData.input_supplier_type,
        contact_person: this.inputSupplierData.contact_person,
        mobile_number: this.inputSupplierData.mobile_number,
        email: this.inputSupplierData.email,
        license_number: this.inputSupplierData.license_number, 
        blockRefId: this.inputSupplierData.block_id,
        distRefId: this.inputSupplierData.district_id,
        villageRefId:this.inputSupplierData.village_id,
        gstNumber: this.inputSupplierData.gst_number,
        pincode: this.inputSupplierData.pincode, 
        userName: this.inputSupplierData.user_name
      })
    })
  }

  selectDistrict(districtId) {
    
    this.profileForm.controls['distRefId'].setValue(districtId);
    this.api.getBlock(parseInt(districtId)).subscribe(blocks => {
      this.blocks = blocks;
      
    })
    
  }

  selectBlock(blockId: any) {
    this.profileForm.controls['blockRefId'].setValue(blockId);
    this.api.getVillageByBlock(parseInt(blockId)).subscribe(v => {
      this.villages = v;
    })
  }

  selectVillage(villRefId) {
    this.profileForm.controls['villageRefId'].setValue(villRefId);
  }

  get formControls() {
    return this.profileForm.controls;
  }
  
  updateProfile() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    
    let user = this.profileForm.value;
    console.log(user);
    this.supplierService.editinputsupplier(user).subscribe(response => {
      if (response.inputSupplierId != '') {
        this.submitted = false;
        this.toastr.success('Profile Updated successfully.');
      }
      else {
        this.toastr.error('Something went wrong');
      }
     });
  }

}
