import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth/auth.service';

@Component({
  selector: 'app-fpo-register',
  templateUrl: './fpo-register.component.html',
  styleUrls: ['./fpo-register.component.css']
})
export class FpoRegisterComponent implements OnInit {
  fpoRegisterForm: FormGroup;
  submitted= false;
  districts = [
    { id: 1, name: "mumbai" },
    { id: 2, name: "pune" },
    { id: 3, name: "nagpur" },
    { id: 4, name: "Allhabad" },
    { id: 5, name: "Delhi" }
  ];
  constructor(private fb: FormBuilder, private api: AuthService) { }

  ngOnInit(): void {
    this.createFpoRegisterForm()
  }
  selectDistrict(districtId: any) {
    this.fpoRegisterForm.controls['distRefId'].setValue(districtId.currentTarget.value);
  }
  selectAgency(districtId: any) {

    console.log(districtId.currentTarget.value);
    this.fpoRegisterForm.controls['agency'].setValue(districtId.currentTarget.value);
  }
 
  createFpoRegisterForm() {
    this.fpoRegisterForm = this.fb.group({
      agency: ['', Validators.required],
      accountNo: ['', Validators.required],
      bankRefId: ['', Validators.required],
      blockRef: ['', Validators.required],
      fpoName: ['', Validators.required],
      distRefId: ['', Validators.required],
      fpoRegistrationNo: ['', Validators.required], 
      deleted: [true],   
      fpoContactNo: ['', Validators.required],
      fpoEmail: ['', Validators.required],
      fpoId: [''],
      ifscCode: ['', Validators.required],
      fpoRegistrationDate: ['', Validators.required],
      fpoOfficeAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      userName: ['', Validators.required],
      


    });
  }
  get formControls() {
    return this.fpoRegisterForm.controls;
  }
  register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.fpoRegisterForm.invalid) {
      return;
    }
    this.fpoRegisterForm.value
    //this.api.registerUser(this.registerForm.value).subscribe(response => {
    //  console.log(response);
    //},
    //  err => {
    //    console.log(err)
    //  })
  }
  


}
