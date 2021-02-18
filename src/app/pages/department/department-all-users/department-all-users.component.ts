import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user/user.service';


@Component({
  selector: 'app-department-all-users',
  templateUrl: './department-all-users.component.html',
  styleUrls: ['./department-all-users.component.css']
})
export class DepartmentAllUsersComponent implements OnInit {

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.reasonSelectedForm = this.formBuilder.group({
      reasons : ['', Validators.required],
      inputOthers:['']
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
      this.Reasons.push({reasonId: this.Reasons.length + 1, reason: 'Others'});
    });
  }

  getAllUserDetails(){
    this.api.getAllUser().subscribe(resp => {
    this.allData = resp;
    this.activeUsers = this.allData.filter(u => u.enabled == true);
    this.deActiveUsers = this.allData.filter(u => u.enabled == false);

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
      userid : user.user_id,
      masterId : 1,
      username : user.user_name,
      userrole: localStorage.getItem('userRole'),
     };
     this.api.updateActiveUser(activeUserData).subscribe(response => {
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
  userid : user.user_id,
  masterId : 1,
  username : user.user_name,
  userrole: localStorage.getItem('userRole'),
  reason : this.chageData,
  };
  if (this.chageData == 'Others') {
deactiveUserData.reason = this.reasonSelectedForm.controls['inputOthers'].value;
  }
    this.api.updateUser(deactiveUserData).subscribe(response => {
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
