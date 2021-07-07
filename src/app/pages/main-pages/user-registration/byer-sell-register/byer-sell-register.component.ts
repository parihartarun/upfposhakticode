import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { MustMatch } from '../../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../../_services/auth/auth.service';

@Component({
  selector: 'app-byer-sell-register',
  templateUrl: './byer-sell-register.component.html',
  styleUrls: ['./byer-sell-register.component.css']
})
export class ByerSellRegisterComponent implements OnInit {
  [x: string]: any;
  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  states = [];
  districts = [];
  blocks = [];
  crops = [];
  cropids = [];
  verieties = [];
  verietyIds = []
  _url: string;
  fieldTextType: boolean;
  fieldTextTypeCpwd:boolean;
  invalidUserName:boolean=false;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router, private toastr: ToastrService, private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  ngOnInit() {
    this.api.getState().subscribe(s => {
      this.states = s
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

  selectState(stateId) {
    this.registerForm.controls['stateRefId'].setValue(stateId.currentTarget.value);
    this.api.getDistrictByState(parseInt(stateId.currentTarget.value)).subscribe(d => {
      this.districts = d
    })
  }
  selectDistrict(districtRefId: any) {   
    this.registerForm.controls['districtRefId'].setValue(districtRefId.currentTarget.value);
  }
 
  createRegisterForm() {
    this.registerForm = this.fb.group({
      area: [''],
      buildingName: ['', Validators.required],
      buyerSellerId: [''],
      buyerSellerName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      designationContactPerson: ['', Validators.required],
      districtRefId: ['', Validators.required],
      deleted: [true],     
      email: ['', [Validators.required, Validators.pattern(/^[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,4}$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9 ]{6}")]],         
      stateRefId: ['', Validators.required],
      userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_]{6,20}")]],
      streetName: ['', Validators.required],
      webSite: [''],
      recaptcha: ['', Validators.required],
      gstNumber: [''],
      tinNumber: [''],
      panNumber: [''],
      companyCategory: [''],
      commdityDealsIn: [],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      userBuyerSeller: [],
      tnc: ['', Validators.required],
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

  register() {    
    console.log(this.selectedItems.toString());
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid || this.invalidUserName == true) {
      return;
    }
    
    let user = {
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      roleRefId:2
    }
    delete this.registerForm.value.password;
    delete this.registerForm.value.userName;
    delete this.registerForm.value.confirmPassword;
    this.registerForm.value.userBuyerSeller = user;
    this.registerForm.value.commdityDealsIn = this.selectedItems.toString();
    this.api.registerBuyerSeller(this.registerForm.value).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success('Registration done successfully.');
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
  public requestAutocompleteItems = (text: string): Observable<string[]> => {
 
    let arr = []

    return this.http.get<any>(this._url + `api/v1/cropMasterDetails/getCommodity`).pipe(map((res: any) => {
      console.log(res);
      this.crops = res;     
        res.map(c => {
        arr.push(c.cropName)
      });
     
      return arr
    }));

  };
  onAdded($event: any){
    $event
    let filterCrop=[]
    filterCrop = this.crops.filter(c => c.cropName === $event.value)   
    filterCrop.map(c => {
      this.cropids.push(c.cropId)
    });
    let searchData = {
      cropids: this.cropids.toString()
    }
    this.api.getVariety(searchData).subscribe(v => {
      this.verieties = v
    })
   
   }
 
  onSelected($event: any) {
    console.log("Fire Selected");
  }

  onItemRemoved($event: any):Observable<any> {
    $event
    let filterCrop = null

    filterCrop = this.crops.filter(c => c.cropName === $event.value);
    this.cropids = this.cropids.filter(item => item != filterCrop[0].cropId)
    console.log("Fire Removed");
    return
  }

  public requestVarietyDealsInAutocompleteItems = (text: string): Observable<string[]> => {
    if (this.cropids.length ==0) {
      return
    }
    let arr=[]
    this.verieties.map(c => {
      c
      arr.push(c.verietyName)
    })  

    return of(arr)
  };

  onAddedVarietyDealsIn($event: any) {
    $event
    let filterVeriety = []
    filterVeriety = this.verieties.filter(c => c.verietyName === $event.value)
    filterVeriety.map(c => {
      this.verietyIds.push(c.verietyId)
    });
    console.log("Fire Added");

  }

 

  removedVarietyDealsIn($event: any) {
    $event
    let filterverieties = null

    filterverieties = this.verieties.filter(c => c.verietyName === $event.value);
    this.verietyIds = this.verietyIds.filter(item => item != filterverieties[0].verietyId)
  
    console.log("Fire Removed");
  }
}
