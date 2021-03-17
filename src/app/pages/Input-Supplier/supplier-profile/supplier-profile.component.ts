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
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  villages = [];
  seeds = []
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  categoryDeals = [];
  isBulkSupplyingCompany: boolean = false;
  isCategoryDealIn = false;
  tempFertilizer = [{ name: 'Normal' }, { name: 'Organic' }, { name: 'Both' }]

  constructor(private fb: FormBuilder,
    private api: AuthService,
    private supplierService: InputSupplierService,
    private _router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.createProfileForm();
    this.getSupplierProfileData();
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      inputSupplierName: ['', Validators.required],
      inputSupplierId: [''],
      inputSupplierType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      license_number: ['', Validators.required],
      districtRefId: ['', Validators.required],
      blockRefId: ['', Validators.required],
      villageRefId:[''],
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      gstNumber: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{0,100}")]],
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      isCategoryDealIn: [this.isCategoryDealIn],
    })
  }

  getSupplierProfileData(){
    this.supplierService.getSupplierProfileData(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.selectDistrict(response.distRefId);
      this.selectBlock(response.blockRef);
      this.profileForm = this.fb.group({
        inputSupplierId: [response.input_supplier_id],
        inputSupplierName: [response.input_supplier_name, Validators.required],
        inputSupplierType: [response.input_supplier_type, Validators.required],
        contactPerson: [response.contact_person, Validators.required],
        mobile_number: [response.mobile_number, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        email: [response.email, [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
        license_number: [response.license_number, Validators.required],
        blockRefId: ['', Validators.required],
        districtRefId: ['', Validators.required],
        villageRefId:[''],
        gstNumber: [response.gst_number, [Validators.required, Validators.pattern("[0-9a-zA-Z]{0,100}")]],
        pincode: [response.pincode, [Validators.required, Validators.pattern("[0-9 ]{6}")]],
        userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
        isCategoryDealIn: [this.isCategoryDealIn],
      })
      setTimeout(()=>{     
        this.profileForm.patchValue({
          blockRefId: response.blockRef,
          villageRefId: response.villageRefId
        });
      }, 1000);
    })
  }

  selectDistrict(districtId: any) {
    this.profileForm.controls['districtRefId'].setValue(districtId);
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

  get formControls() {
    return this.profileForm.controls;
  }
  
  updateProfile() {
    console.log(this.profileForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    
    let user = {
      userName: this.profileForm.value.userName,
      password: this.profileForm.value.password,
      roleRefId: 3
    }

    delete this.profileForm.value.password;
    delete this.profileForm.value.userName;
    delete this.profileForm.value.confirmPassword;
    this.profileForm.value.userInputSeller = user;
    this.profileForm.value.categoryDealIn = this.categoryDeals.toString();

    this.api.registerInputSupplier(this.profileForm.value).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success('Registration done successfully.');
        this.profileForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
      }
    })
  }

  selectCategoryDeals(event: any, categoryDealIn: any) {
    if (event.target.checked) {
      this.categoryDeals.push(event.target.value);
    } else {
      this.categoryDeals = this.categoryDeals.filter(filter => filter != event.target.value);
    }
  }

}
