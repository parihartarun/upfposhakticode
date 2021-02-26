import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-fpoall-user',
  templateUrl: './fpoall-user.component.html',
  styleUrls: ['./fpoall-user.component.css']
})
export class FPOAllUserComponent implements OnInit {


  submitted = false;
  activeUsers: Array<any> = [];
  deActiveUsers: Array<any> = [];
  p: number = 1;
  allData: Array<any> = [];
  Reasons: Array<any> = [];
  reasonSelectedForm: FormGroup;
  currentUser: any;
  valueOther = false;
  chageData;

  constructor(
    private formBuilder: FormBuilder,
    private api: UserService,
    private route: Router,
    private toastr: ToastrService,
    private fpoService: FpoService
  ) { }

  ngOnInit(): void {
    this.reasonSelectedForm = this.formBuilder.group({
      reasons: ['', Validators.required],
      inputOthers: ['']
    });
    this.getAllUserDetails();
    this.getReasons();
  }

  selectChange(e) {
    this.chageData = e.target.value;
    if (this.chageData == 'Others') {
      this.valueOther = true;
    } else {
      this.valueOther = false;
    }
  }

  getReasons() {
    this.api.deactivategetReason().subscribe(resp => {
      this.Reasons = resp;
      this.Reasons.push({ reasonId: this.Reasons.length + 1, reason: 'Others' });
    });
  }

  getAllUserDetails() {
    this.fpoService.getAllFPOUser(Number(localStorage.getItem('masterId'))).subscribe(resp => {
      this.allData = resp;
      this.activeUsers = this.allData.filter(u => u.userEnabled == true);
      this.deActiveUsers = this.allData.filter(u => u.userEnabled == false);

    });
  }

  filterProduction() {

  }
  get formControls() {
    return this.reasonSelectedForm.controls;
  }

  saveDeactivate() {
    this.changeStatus(this.currentUser);
  }
  DeActiveUSer(user) {
    this.currentUser = user;
  }

  activeUSer(user) {
    this.changeActiveStatus(user);
  }

  changeActiveStatus(user) {
    const activeUserData = {
      userid: user.userId,
      masterId: Number(localStorage.getItem('masterId')),
      username: user.userName,
      userrole: localStorage.getItem('userRole'),
    };
    this.fpoService.updateActiveUser(activeUserData).subscribe(response => {
      if (response) {
        this.toastr.success(response.message);

        this.getAllUserDetails();
      } else {
        this.toastr.error('Error! While Activate user.');
      }
    });
  }


  changeStatus(user) {
    const deactiveUserData = {
      userid: user.userId,
      masterId: Number(localStorage.getItem('masterId')),
      username: user.userName,
      userrole: localStorage.getItem('userRole'),
      reason: this.chageData,
    };
    if (this.chageData == 'Others') {
      deactiveUserData.reason = this.reasonSelectedForm.controls['inputOthers'].value;
    }
    this.fpoService.updateUser(deactiveUserData).subscribe(response => {
      if (response) {
        this.toastr.success(response.message);

        this.getAllUserDetails();
      } else {
        this.toastr.error('Error! While Deactivate user.');
      }
    });
  }

  deleteCicular(user) {
    this.api.deleteUser(user.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.getAllUserDetails();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });

  }

  closeModal() {
    this.ngOnInit();
    this.getReasons();
    this.valueOther = false;
  }

}
