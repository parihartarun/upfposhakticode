import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES_MANAGE_SALES: RouteInfo[] = [
  { path: 'fpo/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-white', class: '' },
  { path: 'fpo/crop-production', title: "FPO's Crop Production", icon: 'fa fa-id-card text-white', class: '' },
  { path: 'fpo/sales-details', title: "FPO's Sales Details", icon: 'ni-tv-2 text-white', class: '' },
  { path: 'fpo/production-report', title: 'Farmer-wise Production Report', icon: 'fa fa-plus-square text-white', class: '' },
];
export const FPOROUTES: RouteInfo[] = [
  { path: 'fpo/board-members', title: 'Board Member', icon: 'fa fa-users text-white', class: '' },
  { path: 'fpo/guidelines', title: 'FPO Guidelines', icon: 'fa fa-users text-white', class: '' },
  { path: 'fpo/license', title: 'License', icon: 'fa fa-id-card text-white', class: '' },
  { path: 'fpo/machinary-bank', title: 'Machinary Bank', icon: 'fa fa-university text-white', class: '' },
  { path: 'fpo/storage-unit', title: 'Storage Unit', icon: 'fa fa-archive text-white', class: '' },
  { path: 'fpo/photographs', title: 'Upload Photographs', icon: 'fa fa-university text-white', class: '' },
  { path: 'fpo/services', title: 'Service/Products', icon: 'fa fa-archive text-white', class: '' },
  { path: 'fpo/complaints', title: 'Complaints', icon: 'fa fa-archive text-white', class: '' },
  ]

export const departmentROUTES: RouteInfo[] = [
  { path: 'department/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-white', class: '' },
  { path: '#', title: 'Reports', icon: 'fa fa-users text-white', class: '' },  {
    path: 'department/production-report', title: 'Production Report', icon: 'fa fa-id-card text-white', class: '' },
  { path: 'department/sales-report', title: ' Sales Report', icon: 'fa fa-university text-white', class: '' },
  //{ path: '#', title: ' Circulars', icon: 'fa fa-archive text-white', class: '' },
  { path: 'department/upload-circulars', title: "Upload Circular", icon: 'fa fa-id-card text-white', class: '' },
  { path: 'department/complaints', title: "Complaints", icon: 'ni-tv-2 text-white', class: '' },
  //{ path: '#', title: 'User Management', icon: 'fa fa-archive text-white', class: '' },
  //{ path: 'department/all-users', title: 'All-Users', icon: 'fa fa-plus-square text-white', class: '' },  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public menuItemsCrops: any[];
  public isCollapsed = true;
  userRole: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole == 'ROLE_FPC') {
      this.menuItemsCrops = ROUTES_MANAGE_SALES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
      this.menuItems = FPOROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    } else {
      this.menuItems = departmentROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
  }
}
