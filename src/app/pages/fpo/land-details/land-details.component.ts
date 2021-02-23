import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FarmerService } from 'src/app/_services/farmer/farmer.service';
import { FpoService } from 'src/app/_services/fpo/fpo.service';



@Component({
  selector: 'app-land-details',
  templateUrl: './land-details.component.html',
  styleUrls: ['./land-details.component.css']
})
export class LandDetailsComponent implements OnInit {

  p:number = 1;  
  landDetailForm: FormGroup;
  roleType: any;
  landDetails:Array<any>=[];
  ownerShipList:Array<any>=[
    {ownerName:"Owned"},
    {ownerName:"Leased"},
    {ownerName:"Rented"}
    ];
  FarmerLists:Array<any>=[];
  submitted = false;
  edit = false;
  master_id = localStorage.getItem('masterId');
  farmerId:any
  land_area=0
 constructor(
    private formBuilder: FormBuilder,
    private fpoService: FpoService,
    private route: Router,
   private toastr: ToastrService,
   private farmerService: FarmerService
  ) {}

  ngOnInit(): void {
    this.roleType = localStorage.getItem('userRole')
    if (this.roleType == "ROLE_FPC") {
      this.landDetailForm = this.formBuilder.group({
        farmerId: ['', [Validators.required]],
        guardianName: ['', [Validators.required]],
        ownerShip: ['', [Validators.required]],
        land_area: [this.land_area, [Validators.required, Validators.pattern(/^\d{0,3}(\.\d{1,2})?$/)]],
        isorganc: ['', [Validators.required]],
        masterId: localStorage.getItem('masterId'),
        updatedBy: localStorage.getItem('userRole'),
        landId: [''],
        registrationNumber: [''],
      });
      this.getLandDetailList(this.master_id);

    }
    else {
      this.landDetailForm = this.formBuilder.group({
        farmerId: localStorage.getItem('masterId'),   
        ownerShip: ['', [Validators.required]],
        land_area: [this.land_area, [Validators.required, Validators.pattern(/^\d{0,3}(\.\d{1,2})?$/)]],
        isorganc: ['', [Validators.required]],
        masterId: localStorage.getItem('masterId'),
        updatedBy: localStorage.getItem('userRole'),
        landId: [''],
        registrationNumber: [''],
      });
      this.getFarmerLandDetailList(this.master_id);
    }
    console.log(this.landDetailForm.value);
    
    this.getFarmerDetailList();
    
  }

  getFarmerDetailList(){
    this.fpoService.getFarmerDetailList(localStorage.getItem('masterId')).subscribe(
      response => {
      console.log(response);
        this.FarmerLists = response;
       
      })
  }
  getFarmerDetailFarmerformUpPardarshi(registrationNumber) {
   
    this.fpoService.getfarmerDetailfromUpardarshi(registrationNumber).subscribe(
      response => {
        console.log(response);
        this.FarmerLists = response;
      })
  }

  getLandDetailList(id){
    this.fpoService.getLandDetailList(id).subscribe(
      response => {
        console.log(response);
        this.landDetails = response;
    })
  }
  getFarmerLandDetailList(id) {
    this.farmerService.getFarmerLandDetailList(id).subscribe(
      response => {
        console.log(response);

      })
  }

  addLandDetail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.landDetailForm.invalid) {
      return;
    }
    var data = this.landDetailForm.value;
    if (this.landDetailForm.value.farmerId) {
      this.farmerId = this.landDetailForm.value.farmerId
    }
    data['farmerProfile'] = { "farmerId": this.farmerId };
    delete data.farmerId;
    this.landDetailForm.value.masterId = localStorage.getItem('masterId');
    if (this.roleType == "ROLE_FPC") {
      this.fpoService.addLandDetails(data).subscribe(response => {
        console.log(response)
        if (response.id != '') {
          this.toastr.success('Land Details Added Successfully.')
          this.submitted = false
          this.landDetailForm.reset();
          this.getLandDetailList(this.master_id);
        } else {
          this.toastr.error('Error! While Adding Land Details.')
        }
      },
        err => {
          console.log(err)
        })
    }
    else {
      this.farmerService.addLandDetails(data).subscribe(response => {
        console.log(response)
        if (response.id != '') {
          this.toastr.success('Land Details Added Successfully.')
          this.submitted = false
          this.landDetailForm.reset();
          this.getFarmerLandDetailList(this.master_id);
        } else {
          this.toastr.error('Error! While Adding Land Details.')
        }
      },
        err => {
          console.log(err)
        })
    }
  }
  
  updateLandDetail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.landDetailForm.invalid) {
      return;
    }
    var data = this.landDetailForm.value;
    data['farmerProfile'] = { "farmerId": Number(this.landDetailForm.value.farmerId) };
    delete data.farmerId;
    console.log(data);
    this.landDetailForm.value.masterId = Number(localStorage.getItem('masterId'));
        if(this.roleType == "ROLE_FPC") {
      this.fpoService.updateLandDetail(data).subscribe(response => {
              if (response.id != '') {
                this.toastr.success('Land Detail Updated successfully.');
                this.submitted = false;
                this.edit = false;
                this.landDetailForm.reset();
              } else {
                this.toastr.error('Error! While Updating Land Detail.');
              }
              this.getLandDetailList(this.master_id);
            },
              err => {
                console.log(err)
              }
            );
          }
        else {
          this.farmerService.updateLandDetail(data).subscribe(response => {
            if (response.id != '') {
              this.toastr.success('Land Detail Updated successfully.');
              this.submitted = false;
              this.edit = false;
              this.landDetailForm.reset();
            } else {
              this.toastr.error('Error! While Updating Land Detail.');
            }
            this.getFarmerLandDetailList(this.master_id);
          },
            err => {
              console.log(err)
            }
          );
        }
  }

  editLandDetail(landDetail){
    console.log(localStorage.getItem('userrole'));
    if (this.roleType == "ROLE_FPC") {
      this.landDetailForm = this.formBuilder.group({
        farmerId: [landDetail.farmerId, [Validators.required]],
        guardianName: [landDetail.parantsName, [Validators.required]],
        ownerShip: [landDetail.ownership, [Validators.required]],
        land_area: [landDetail.landArea, [Validators.required, Validators.pattern(/^\d{0,3}(\.\d{1,2})?$/)]],
        isorganc: [landDetail.isorganc, [Validators.required]],
        masterId: localStorage.getItem('masterId'),
        updatedBy: localStorage.getItem('userRole'),
        landId: [landDetail.landId],
        registrationNumber: [''],
       
      });
    }
    else {
      this.landDetailForm = this.formBuilder.group({
        farmerId: localStorage.getItem('masterId'),
       
        ownerShip: [landDetail.ownership, [Validators.required]],
        land_area: [landDetail.landArea, [Validators.required, Validators.pattern(/^\d{0,2}(\.\d{1,2})?$/)]],
        isorganc: [landDetail.isorganc, [Validators.required]],
        masterId: localStorage.getItem('masterId'),
        updatedBy: localStorage.getItem('userRole'),
        landId: [landDetail.landId],
        registrationNumber: [''],
      });
    }
    
    this.edit = true;
    window.scroll(0,0);
  }

  confirmDelete(landDetailId){
    if (confirm("Are you sure to delete this item")) {
      if (this.roleType == "ROLE_FPC") {
        this.fpoService.deletelandDetailById(landDetailId).subscribe(response => {
          if (response == true) {
            this.toastr.success('Land Detail Deleted successfully.');
            this.getLandDetailList(this.master_id);
          } else {
            this.toastr.error('Error! While Deleting Land Detail.');
          }
        },
          err => {
            console.log(err)
          }
        );
      }
      else {
        this.farmerService.deletelandDetailById(landDetailId).subscribe(response => {
          if (response == true) {
            this.toastr.success('Land Detail Deleted successfully.');
            this.getFarmerLandDetailList(this.master_id);
          } else {
            this.toastr.error('Error! While Deleting Land Detail.');
          }
        },
          err => {
            console.log(err)
          }
        );
      }
      }
    }
  

  resetForm(){
    this.landDetailForm.reset();
  }

  get formControls(){
    return this.landDetailForm.controls;
  }
  getUserTypes() {
    if (this.roleType == 'ROLE_FPC') {
      return true
    }
    else {
      return false
    }
  }
  selectFarmer(farmer) {
  
    let registrationNumber = this.FarmerLists.find(f => f.farmerId == Number(farmer.currentTarget.value))  
    this.getFarmerDetailFarmerformUpPardarshi(registrationNumber.upBSMId);
  }
  fetchDetail(farmer) {
    //let registrationNumber = this.landDetailForm.controls['registrationNumber'];
    //this.getFarmerDetailFarmerformUpPardarshi(registrationNumber);
  }
}
