import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';
import { AuthService } from '../../../_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.css']
})
export class BoardMembersComponent implements OnInit {
  memberForm: FormGroup;
  submitted = false;
  members:Array<any>=[];
  p:number = 1;
  districts = [];
  blocks = [];
  panchayats = [];
  villages = [];
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private auth: AuthService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      guardianName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNo: ['', [Validators.pattern("[0-9 ]{10}")]],
      designation: ['', [Validators.required]],
      gender: [''],
      distId: [''],
      blockId: [''],
      panchayatId: [''],
      villageId: [''],
      masterId:localStorage.getItem('masterId'),
      updatedBy:localStorage.getItem('userRole'),
      id:['']
    });
    this.getBoardMembers();
    this.getDistricts();
  }

  getBoardMembers(){
    this.api.getBoardMembers(this.memberForm.value).subscribe(data => {
      console.log(data);
      this.members = data;
    },
      err => {
        console.log(err)
      }
    );
  }

  getDistricts() {
    this.auth.getDistrict().subscribe(data=>{   
      this.districts = data;
    });
  }

  selectDistrict(districtId: any) {
    console.log(districtId);
    if(districtId != null){
      this.memberForm.patchValue({'distId':districtId});
      this.auth.getBlock(parseInt(districtId)).subscribe(block => {
        this.blocks = block
      })
    }
  }
  selectBlock(blockId: any) {
    if(blockId != null){
      this.memberForm.controls['blockId'].setValue(blockId);
      this.auth.getGramPanchayat(parseInt(blockId)).subscribe(panchayt => {
        this.panchayats = panchayt
      })
    }
  }
  selectPanchayat(panchayatId: any) { 
    if(panchayatId != null){
      this.memberForm.controls['panchayatId'].setValue(panchayatId);
      this.auth.getVillage(parseInt(panchayatId)).subscribe(village => {
        this.villages = village
      })
    }  
  }

  confirmDelete(id){
    console.log(id);
    if(confirm("Are you sure to delete this item.")) {
      this.api.deleteBoardMember(id).subscribe(response => {
        this.getBoardMembers();
        if(response != ''){
          this.toastr.success('Storage Unit Deleted successfully.');
        }else{
          this.toastr.error('Error! While Deleting Storage Unit.');
        }
      },
        err => {
          console.log(err)
        }
      );
    }
  }

  editBoardMember(member){
    console.log(member.id);
    this.selectDistrict(member.distId);
    this.selectBlock(member.blockId);
    this.selectPanchayat(member.panchayatId);
    this.memberForm = this.formBuilder.group({
      name: [member.name, [Validators.required]],
      guardianName: [member.guardianName, [Validators.required]],
      email: [member.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNo: [member.contactNo, [Validators.pattern("[0-9 ]{10}")]],
      designation: [member.designation, [Validators.required]],
      gender: [member.gender],
      distId: [member.distId],
      blockId: [member.blockId],
      panchayatId: [member.panchayatId],
      villageId: [member.villageId],
      masterId:localStorage.getItem('masterId'),
      updatedBy:localStorage.getItem('userRole'),
      id:[member.id],
    });
    this.edit = true;
    window.scroll(0,0);  
  }

  updateBoardMember(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.memberForm.invalid) {
        return;
    }
    console.log(this.memberForm.value);
    this.api.updateBoardMember(this.memberForm.value).subscribe(response => {
      console.log(response);
      if(response.id != ''){
         this.toastr.success('Storage unit updated successfully.');
        this.submitted = false;
        this.edit = false;
        this.memberForm.reset();
        this.getBoardMembers();
      }else{
          this.toastr.error('Error! While updating Storage unit.');
      }
    },
      err => {
        console.log(err)
      }
    );
  }

  addBoardMember() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.memberForm.invalid) {
        return;
    }
    console.log(this.memberForm.value);

    this.api.addBoardMember(this.memberForm.value).subscribe(response => {
      this.toastr.success('Storage Unit Added successfully.');
      this.getBoardMembers();
    },
      err => {
        console.log(err)
      }
    );
  }

  get formControls(){
    return this.memberForm.controls;
  }

}
