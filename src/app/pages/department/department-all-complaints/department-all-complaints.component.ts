import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../_services/auth/auth.service';
import { DepartmentService } from '../../../_services/department/department.service';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-department-all-complaints',
  templateUrl: './department-all-complaints.component.html',
  styleUrls: ['./department-all-complaints.component.css']
})
export class DepartmentAllComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
  fliterForm: FormGroup;
  submitted = false;
  complaintsCatageriy: Array<any> = [];
  complaints: Array<any> = [];
  p: number = 1;
  checkfileFormat: boolean = false;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  fileToUpload: File = null;
  isViewComplaint = false;
  users: Array<any> = [];
  filterResponse: any[];
  roleType: any;
  
  orderBy: { order: string, key: string } = { order: '', key: '' };
  searchText = '';
  viewComp = { title: "", compalintDate: '', description: '', currentStatus: '', assignedTo: '', assigned_date: '', remarks: '', name: "", mobile: "", email: "" }
  constructor(
    private formBuilder: FormBuilder,
    private api: DepartmentService,
    private route: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService, private datePipe: DatePipe,
    private _activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roleType = localStorage.getItem('userRole')
    this.authService.getDeptmentUser().subscribe(u => {
      this.users = u
    })
    this.fliterForm = this.formBuilder.group({
      complaint: ['New']

    });
    fpoId: localStorage.getItem('masterId')

    this.getComplaints();
  }

  getComplaints() {
    let url = "";
    let role = "";
    url = this.route.url
    if (url === "/deptInput/complaints") {
      role = "ROLE_INPUTSUPPLIER";
      this.api.getAllComplaintInputSupplier(role).subscribe(response => {
        console.log(response);
        this.complaints = response;
        this.filterResponse = response
        if (!this.filterResponse || this.filterResponse.length <= 0) {
          return
        }
        this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
        this.fliterForm.controls['complaint'].setValue('New')
      });
    }
    else if (url === "/deptBuyer/complaints") {
      role = "ROLE_BUYERSELLER";
      this.api.getAllComplaintBuyerSeller(role).subscribe(response => {
        console.log(response);

        this.complaints = response;
        this.filterResponse = response
        if (!this.filterResponse || this.filterResponse.length <= 0) {
          return
        }
        this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
        this.fliterForm.controls['complaint'].setValue('New')
      });
    }
    else if (url === "/deptCHC/complaints") {
      role = "ROLE_CHCFMB";
      this.api.getAllComplaintChcFmb(role).subscribe(response => {
        console.log(response);

        this.complaints = response;
        this.filterResponse = response
        if (!this.filterResponse || this.filterResponse.length <= 0) {
          return
        }
        this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
        this.fliterForm.controls['complaint'].setValue('New')
      });
    }
     

  }

  updateSatus() {
    this.submitted = true;
    if (this.complaintForm.invalid) {
      return;
    }
    const formData: FormData = new FormData();

    formData.append('id', this.complaintForm.value.id);
    formData.append('assign_to', this.complaintForm.value.assign_to);
    formData.append('comment', this.complaintForm.value.comment);
    formData.append('status', this.complaintForm.value.status);
    formData.append('role', this.complaintForm.value.role);
    this.api.updateStatus(this.complaintForm.value, formData).subscribe(response => {
      if (response.id != '') {
        this.toastr.success(response.message);
        this.submitted = false;
        this.complaintForm.reset();
        this.getComplaints();
        this.isViewComplaint = false;
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }

  get formControls() {
    return this.complaintForm.controls;
  }


  selectComplaint(complaint) {
    this.complaintForm.controls['title'].setValue(complaint.currentTarget.value);
  }

  deleteCompliant(complaint) {
    this.api.deleteCompliant(complaint.id).subscribe(response => {
      if (response != '') {
        this.toastr.success('Delete successfully');
        this.getComplaints();
      } else {
        this.toastr.error('Error! While Add complaint.');
      }
    });
  }


  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist.id == idSecond.id;
  }
  reset() {
    this.complaintForm.reset();
  }
  close() {
    this.isViewComplaint = false;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  viewComplaint(complaint) {
    this.isViewComplaint = true;
    this.viewComp.assignedTo = complaint.assignBy;
    this.viewComp.assigned_date = complaint.assign_date;
    this.viewComp.currentStatus = this.getStatus(complaint.status);
    this.viewComp.description = complaint.description;
    this.viewComp.compalintDate = complaint.updateDate;
    this.viewComp.remarks = complaint.createDateTime;
    this.viewComp.title = complaint.title;
    if (complaint.role == 'ROLE_INPUTSUPPLIER'){
      this.viewComp.name = complaint.inputSupplierName;
    } else if (complaint.role == 'ROLE_BUYERSELLER') {
      this.viewComp.name = complaint.buyerSellerName;
    }
    else if (complaint.role == 'ROLE_CHCFMB') {
      this.viewComp.name = complaint.chcFmbName;
    }
    this.viewComp.email = complaint.email;
    window.scroll(0, 0)
    this.complaintForm = this.formBuilder.group({
      id: [complaint.id],
      assign_to: ['', [Validators.required]],
      appointmentDate: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      comment: ['', [Validators.required]],
      status: ['', [Validators.required]],
      role: [complaint.role],
    });
  }
  getStatus(status) {
    if (status == 0) {
      return "OPEN"
    } else if (status == 1) {
      return "ASSIGNED"
    }
    else if (status == 2) {
      return "RESOLVED"
    }
    else {
      return "RESOLVED"
    }

  }
  filterComaplaint() {
    // if (!this.complaints ||this.complaints.length <= 0) {
    //   return
    // }
    if (this.fliterForm.controls['complaint'].value === "New") {
      this.complaints = this.filterResponse.filter(f => !f.status || this.getStatus(f.status) == 'OPEN');
    }
    else if (this.fliterForm.controls['complaint'].value === "resolved") {
      this.complaints = this.filterResponse.filter(f => this.getStatus(f.status) === 'RESOLVED');
    }else if (this.fliterForm.controls['complaint'].value === "assigned") {
      this.complaints = this.filterResponse.filter(f => this.getStatus(f.status) === 'ASSIGNED');
    }
    else {
      this.complaints = this.filterResponse.filter(f => f.status);

    }
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
}
