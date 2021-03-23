import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../_services/department/department.service';

@Component({
  selector: 'app-view-all-notifications',
  templateUrl: './view-all-notifications.component.html',
  styleUrls: ['./view-all-notifications.component.css']
})
export class ViewAllNotificationsComponent implements OnInit {

  tabData:any;
  allTabData:any;
  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  currentRate = 8;

  getCircularObserver = this.departmentService.getAllCircluarUpload().subscribe(data => {
    console.log("Tabular data==>",data);
    this.tabData = data;
    this.allTabData = this.tabData;
    this.collectionSize = data.length;
   });

  constructor(private departmentService:DepartmentService) { }

  ngOnInit(): void {
  }

}
