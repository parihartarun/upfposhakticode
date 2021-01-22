import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FpoService } from '../../../_services/fpo/fpo.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private api: FpoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: [''],
      designation: ['', [Validators.required]],
      gender: [''],
      district: [''],
      block: [''],
      grampanchayat: [''],
      village: [''],
      masterId:localStorage.getItem('masterId')
    });
    this.getBoardMembers();
  }

  getBoardMembers(){
    this.api.getBoardMembers(this.memberForm.value).subscribe(data => {
      this.members = data;
    },
      err => {
        console.log(err)
      }
    );
  }

  deleteBoardMember(id){
    this.api.deleteBoardMember(id).subscribe(response => {
      this.getBoardMembers();
      console.log(response);
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

    this.api.addBoardMember(this.memberForm.value).subscribe(response => {
      this.getBoardMembers();
      console.log(response);
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
