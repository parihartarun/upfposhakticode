import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MustMatch } from '../../../_helpers/constomMatchValidor';
import { AuthService } from '../../../_services/auth/auth.service';







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
  verieties=[]
  _url: string;
  constructor(private fb: FormBuilder, private api: AuthService, private _router: Router, private toastr: ToastrService, private http: HttpClient) {
    this._url = environment.baseUrl;
  }

  ngOnInit() {
    this.api.getState().subscribe(s => {
      this.states = s
    })
    this.createRegisterForm();
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
      area: ['', Validators.required],
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
      userName: ['', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,20}")]],
      streetName: ['', Validators.required],
      webSite: [''],
      recaptcha: ['', Validators.required],
      gstNumber: ['',Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}")],
      tinNumber: [''],
      PANnumber: ['',Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")],
      companyCategory: ['', Validators.required],
      commdityDealsIn: [],
      varietyDealsIn: [],
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
  register() {
    console.log('this.formControls',this.formControls);
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
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
    this.api.registerBuyerSeller(this.registerForm.value).subscribe(response => {
      if (response.message == "SuccessFully Saved!") {
        this.toastr.success(response.message);
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
  //requestAutocompleteItems(text: string) {
  //  this.api.getAllTags(text).subscribe(t => {
  //    return t
  //  })
  //}
  public requestAutocompleteItems = (text: string): Observable<string[]> => {
 
    let arr = []

    return this.http.get<any>(this._url + `api/v1/cropMasterDetails/getCropsBySearch/${text}`).pipe(map((res: any) => {
      this.crops = res;     
        res.map(c => {
        arr.push(c.cropName)
      });
     
      return arr
    }));

  };
  onAdded($event: any) {
    $event
    let filterCrop=[]
    filterCrop = this.crops.filter(c => c.cropName === $event.value)   
    filterCrop.map(c => {
      this.cropids.push(c.cropId)
    });
    let searchData = {
      cropids: this.cropids
    }
    return this.http.post<any>(this._url + `api/v1/cropVarietyDetails/getCropVarietyByMultipleCropId`, searchData).pipe(map((v: any) => {
      this.verieties=v
      return this.verieties;
    }));
   }

  onSelected($event: any) {
    console.log("Fire Selected");
  }

  onItemRemoved($event: any) {
    $event
    let filterCrop = null

    filterCrop = this.crops.filter(c => c.cropName === $event.value);
    this.cropids=this.cropids.filter(item => item != filterCrop[0].cropId)
    console.log("Fire Removed");
  }

  public requestVarietyDealsInAutocompleteItems = (text: string): Observable<string[]> => {
    if (this.cropids.length ==0) {
      return
    }
    this.verieties.filter(v=>v)

    return of(this.verieties)
  };

  onAddedVarietyDealsIn($event: any) {
    $event
    let filterCrop = []
    filterCrop = this.crops.filter(c => c.cropName === $event.value)
    filterCrop.map(c => {
      this.cropids.push(c.cropId)
    });
    console.log("Fire Added");

  }

 

  removedVarietyDealsIn($event: any) {
    $event
    let filterCrop = null

    filterCrop = this.crops.filter(c => c.cropName === $event.value);
    this.cropids = this.cropids.filter(item => item != filterCrop[0].cropId)
    console.log("Fire Removed");
  }
}
