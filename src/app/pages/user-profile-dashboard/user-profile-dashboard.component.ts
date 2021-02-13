import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-user-profile-dashboard',
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.css']
})
export class UserProfileDashboardComponent implements OnInit {

  InputsupplierprofileForm:FormGroup;
  userId:any;

  constructor(private formBuilder: FormBuilder,
     private toastr: ToastrService,
     private inputservice:InputSupplierService) { }

  ngOnInit(): void {

    this.InputsupplierprofileForm = this.formBuilder.group({
      userName:['', Validators.required],
      email:['', Validators.required],
      contact_person:['',Validators.required],
      mobile_number:['',Validators.required],
      pincode:['',Validators.required]
      
    });

    this.userId = localStorage.getItem('masterId');
    // call to api to get this user details
    // set te response value to form
    console.log(this.userId)
    


   this.inputservice.getbyid(this.userId).subscribe(res=>{
     console.log(res)
     if(res){
      this.InputsupplierprofileForm.setValue({
        email:res.email,
        contact_person:res.contact_person,
        mobile_number:res.mobile_number,
        userName:res.userInputSeller.userName,
        pincode:res.pincode
      });
     }
   })
  }

  updateProfile()
  {
   
    this.inputservice.editinputsupplier(this.InputsupplierprofileForm.value,this.userId).subscribe(res=>{
      this.toastr.success('Edit Profile  Successfully.');
   
      console.log(res);
    })
  }
}
