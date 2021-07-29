import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user/user.service';
import { environment } from 'src/environments/environment';
import { ExcelService } from '../../../_services/Excel/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-department-all-users',
  templateUrl: './department-all-users.component.html',
  styleUrls: ['./department-all-users.component.css']
})
export class DepartmentAllUsersComponent implements OnInit {
  siteUrl: string;
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
  searchText = '';
  orderBy: { order: string, key: string } = { order: '', key: '' };
  activePagination = 1;
  searchTextActive = '';
  orderByActive: { order: string, key: string } = { order: '', key: '' };

  constructor(
    private formBuilder: FormBuilder,
    private api: UserService,
    private route: Router,
    private toastr: ToastrService,
    private excelService:ExcelService
  ) { 
    // this.siteUrl = environment.siteUrl;
  }

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
    this.api.getAllUser().subscribe(resp => {
      console.log(resp);
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
      userid: user.user_id,
      masterId: 1,
      username: user.user_name,
      userrole: localStorage.getItem('userRole'),
    };
    this.api.updateActiveUser(activeUserData).subscribe(response => {
      if (response) {
        this.toastr.success("User Activated Successfully.");

        this.getAllUserDetails();
      } else {
        this.toastr.error('Error! While Activating user.');
      }
    });
  }


  changeStatus(user) {
    const deactiveUserData = {
      userid: user.user_id,
      masterId: 1,
      username: user.user_name,
      userrole: localStorage.getItem('userRole'),
      reason: this.chageData,
    };
    if (this.chageData == 'Others') {
      deactiveUserData.reason = this.reasonSelectedForm.controls['inputOthers'].value;
    }
    this.api.updateUser(deactiveUserData).subscribe(response => {
      if (response) {
        this.toastr.success("User Deactivated Successfully.");

        this.getAllUserDetails();
      } else {
        this.toastr.error('Error! While Deactivating User.');
      }
    });
  }

  closeModal() {
    this.ngOnInit();
    this.getReasons();
    this.valueOther = false;
  }
  onClickOrderBy(key: any) {
    this.orderBy = {
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }
  onClickOrderByActive(key: any) {
    this.orderByActive = {
      ...this.orderByActive,
      'order': this.orderByActive.order == 'asc' ? 'desc' : 'asc',
      'key': key
    };
  }

  exportAsXLSX(data, userType):void {
    var users = [];
    data.forEach( (element) => {
      var obj = {
        "Registered Under": element.registered_under,
        "Agency (Associated with) ": element.agency,
        'User Name' : element.user_name,
        'FPO Name' : element.fpo_name,
        'District Name' : element.district_name,
        'Block' : element.block_name,
        'Registration Date' : element.date_of_regi,
        'FPO Contact No' : element.fpo_landline,
        'FPO Email' : element.fpo_email, 
        'FPO Registration No' : element.fpo_lot_no, 
        'FPO Address' : element.fpo_address, 
        'Pincode' : element.pincode, 
      }
      users.push(obj);
    });
    this.excelService.exportAsExcelFile(users, 'All_'+userType+'_Users');
  }

  createPdf(data, userType) {
    var userdata = [];

    var headers = [['User Name', 
    'FPO Name', 
    'District Name', 
    'Registration Date', 
    'FPO Contact No', 
    'FPO Email'
    ]]
    data.forEach( (element) => {
      var arr = [element.user_name, 
        element.fpo_name,
        element.district_name,
        element.date_of_regi,
        element.fpo_landline,
        element.fpo_email,
      ]
      userdata.push(arr);
    });

    var doc = new jsPDF();

    doc.setFontSize(10);
    //doc.text('Production Report', 11, 8);
    doc.setFontSize(8);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: headers,
      body: userdata,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    //doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(userType+'_user_report.pdf');
  }
}
