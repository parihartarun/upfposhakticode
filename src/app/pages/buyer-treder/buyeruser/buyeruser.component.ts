import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BuyerSellerService } from '../../../_services/BuyerSeller/buyerseller.services'

@Component({
  selector: 'app-buyeruser',
  templateUrl: './buyeruser.component.html',
  styleUrls: ['./buyeruser.component.css']
})
export class BuyeruserComponent implements OnInit {

  buyerprofileForm: FormGroup;
  userId: any;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private buyerservice: BuyerSellerService) { }

  ngOnInit(): void {

    this.buyerprofileForm = this.formBuilder.group({
      contactPerson: ['', Validators.required],
      userName: ['', Validators.required],
      designationContactPerson: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      buildingName: ['', Validators.required],
      streetName: ['', Validators.required],
      area: ['', Validators.required],
      districtRefId: ['', Validators.required],
      stateRefId: ['', Validators.required],
      pincode: ['', Validators.required],
      email: ['', Validators.required]

    });

    this.userId = localStorage.getItem('masterId');
    // call to api to get this user details
    // set te response value to form


    this.buyerservice.getbyid(this.userId).subscribe(res => {
      console.log(res)
      if (res) {
        this.buyerprofileForm.setValue({

          contactPerson: res.contactPerson,
          userName: res.userBuyerSeller.userName,
          designationContactPerson: res.designationContactPerson,
          mobileNumber: res.mobileNumber,
          buildingName: res.buildingName,
          streetName: res.streetName,
          area: res.area,
          districtRefId: res.districtRefId,
          stateRefId: res.stateRefId,
          pincode: res.pincode,
          email: res.email
        });
      }
    })
  }

  updateProfile() {

    this.buyerservice.editbuyer(this.userId, this.buyerprofileForm.value).subscribe(res => {

      // if (res != '') {
      this.toastr.success('Edit Profile  Successfully.');

      // } else {
      //   this.toastr.error('Error! While Add complaint.');
      // }

      console.log(res);
    })
  }
}
