import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/_helpers/constomMatchValidor';
import { AuthService } from 'src/app/_services/auth/auth.service';


@Component({
  selector: 'app-input-supplier-register',
  templateUrl: './input-supplier-register.component.html',
  styleUrls: ['./input-supplier-register.component.css']
})
export class InputSupplierRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  districts = [];
  blocks = [];
  villages = [];
  seeds=[]
  inputSupplierTypes = [{ id: 1, name: 'Bulk supplying company' }, { id: 2, name: 'Retailer' }]
  categoryDeals=[];
  isBulkSupplyingCompany: boolean = false;
  isCategoryDealIn = false;
  tempFertilizer = [{ name: 'Normal' }, { name: 'Organic' }, { name: 'Both' }]
  fieldTextType: boolean;
  fieldTextTypeCpwd:boolean;
  invalidUserName:boolean=false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = d
    })
    this.api.getSeed().subscribe(d => {
      this.seeds = d
    })

    this.createRegisterForm();
    this.getDropdownListItems();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item.item_id);
    this.selectedItems.push(item.item_id);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = items.map(item=>{
      return item.item_id;
    })
  }

  onItemDeselect(item:any){
    this.selectedItems.splice(this.selectedItems.indexOf(item.item_id), 1);
  }

  onItemDeselectAll(){
    this.selectedItems = [];
  }

  getDropdownListItems(){
    let arr = [];
    this.api.getCommoditiesDealIn().subscribe(response => {
      console.log(response);
      for (var key in response) {
        var obj = {
          item_id:key,
          item_text:response[key]
        }
        arr.push(obj);
      }
      this.dropdownList = arr;
    })
  }

  selectDistrict(districtId: any) {
    this.api.getBlock(parseInt(districtId)).subscribe(blocks => {
      this.blocks = blocks;
    })
  }
  selectBlock(blockId: any) {
    this.api.getVillageByBlock(parseInt(blockId)).subscribe(v => {
      this.villages = v;
    })

  }
  selectVillage(villRefId: any) {
    this.registerForm.controls['villageRefId'].setValue(villRefId.currentTarget.value);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeCpwd(){
    this.fieldTextTypeCpwd = !this.fieldTextTypeCpwd;
  }

  validateUserName(userName){
    this.invalidUserName = false;
    this.api.validateUserName(userName).subscribe(response => {
      if(response.status !== "Accepted"){
        this.invalidUserName = true;
      }
    })
  }

  selectInputSupplierType(inputSupplierType: any) {
    if (parseInt(inputSupplierType.currentTarget.value) == 1) {
      this.isBulkSupplyingCompany = false;
      this.registerForm.get('blockRefId').patchValue('');
     
      this.registerForm.get('villageRefId').patchValue('');
      this.registerForm.get('blockRefId').clearValidators();
      this.registerForm.get('distRefId').clearValidators();
      this.registerForm.get('villageRefId').clearValidators();
      this.registerForm.get('blockRefId').updateValueAndValidity();
      
      this.registerForm.get('villageRefId').updateValueAndValidity();
    } else {
      this.isBulkSupplyingCompany = true;
      this.registerForm.get('blockRefId').setValidators([Validators.required])
      this.registerForm.get('distRefId').setValidators([Validators.required])
      this.registerForm.get('villageRefId').setValidators([Validators.required]);
      this.registerForm.updateValueAndValidity();
    }
    this.registerForm.controls['inputSupplierType'].setValue(inputSupplierType.currentTarget.value);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      blockRefId: ['', Validators.required],
      inputSupplierName: ['', Validators.required],
      inputSupplierId: [''],
      inputSupplierType: ['', Validators.required],
      contactPerson: ['', Validators.required],
      license_number: ['', Validators.required],
      distRefId: ['', Validators.required],
      deleted: [true],
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      gstNumber: ['', [Validators.pattern("[0-9a-zA-Z]{0,100}")]],
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],
      seed_id: [''],
      villageRefId: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      recaptcha: ['', Validators.required],
      userInputSeller: [],
      seedId: [],
      Fertilizer: [''],
      cide: [''],
      Equipment: [''],
      isCategoryDealIn: [this.isCategoryDealIn],
      categoryDeal:[],
      tnc: ['', Validators.required],
      categoryDealIn: [],
     
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],     
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })



  }
  get formControls() {
    return this.registerForm.controls;
  }
  get password() {
    return this.registerForm.get('password');
  }
  register() {
    console.log(this.selectedItems.toString());
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid || this.invalidUserName == true) {
      return;
    }
    this.registerForm.value
    let user = {
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      roleRefId: 3
    }
    delete this.registerForm.value.password;
    delete this.registerForm.value.userName;
    delete this.registerForm.value.confirmPassword;
    this.registerForm.value.userInputSeller = user;
    this.registerForm.value.categoryDealIn = this.selectedItems.toString();
    this.api.registerInputSupplier(this.registerForm.value).subscribe(response => {

      if (response.message == "SuccessFully Saved!") {
        this.toastr.success('Registration Done Successfully.');
        this.registerForm.reset();
        this._router.navigate(['/login'])
      }
      else {
        this.toastr.error(response.message);
      }
    })
  }


  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }
  selectCategoryDeals(event: any, categoryDealIn:any) {   

    if (event.target.checked) {
      //this.searchCriteria.push(district)

      this.categoryDeals.push(event.target.value);

    } else {

      this.categoryDeals = this.categoryDeals.filter(filter => filter != event.target.value);
    }
  }
}
