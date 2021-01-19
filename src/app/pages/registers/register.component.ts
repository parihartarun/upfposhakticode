import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  routerParameterId: any;
  selectRegisterForm = 'FPO'
  districts = [
    { id: 1, name: "mumbai" },
    { id: 2, name: "pune" },
    { id: 3, name: "nagpur" },
    { id: 4, name: "Allhabad" },
    { id: 5, name: "Delhi" }
  ];
  constructor(private fb: FormBuilder, private api: AuthService, private _activatedroute: ActivatedRoute) {
   

  }

  ngOnInit() {
    this.routerParameterId = this._activatedroute.snapshot.paramMap.get("id");
    this._activatedroute.paramMap.subscribe(params => {
      this.routerParameterId = params.get('id');
      if (this.routerParameterId == 1) {
        this.selectRegisterForm = 'FPO';
      }
      else if (this.routerParameterId == 2) {
        this.selectRegisterForm = 'Farmers'
      }
      else if (this.routerParameterId == 3) {
        this.selectRegisterForm = 'Buyer/Seller';
      }
      else if (this.routerParameterId == 4) {
        this.selectRegisterForm = 'InputSupplier'
      }
    });

   
    this.api.getDistrict().subscribe(d => {
      d
    }
    )
    this.createRegisterForm();
    

  }
  selectDistrict(districtId: any) {

    console.log(districtId.currentTarget.value);
    this.registerForm.controls['distRefId'].setValue(districtId.currentTarget.value);
}
  createRegisterForm(){
  this.registerForm = this.fb.group({
    selectFormValue: [this.selectRegisterForm],


  });
}
  get formControls() {
    return this.registerForm.controls;
  }
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value
    //this.api.registerUser(this.registerForm.value).subscribe(response => {
    //  console.log(response);
    //},
    //  err => {
    //    console.log(err)
    //  })
  }
  selectRegister(selectRegisterForm: any) {   
    this.selectRegisterForm = selectRegisterForm.currentTarget.value
    this.registerForm.controls['selectFormValue'].setValue(selectRegisterForm.currentTarget.value);
  }

}
