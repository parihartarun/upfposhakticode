import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-white', class: '' },
    { path: '/board-members', title: 'Board Member',  icon: 'fa fa-users text-white', class: '' },
    { path: '/license', title: 'License',  icon: 'fa fa-id-card text-white', class: '' },
    { path: '/machinary-bank', title: 'Machinary Bank',  icon: 'fa fa-university text-white', class: '' },
    { path: '/storage-unit', title: 'Storage Unit',  icon: 'fa fa-archive text-white', class: '' },
    { path: '/crop-production', title: "FPO's Crop Production",  icon: 'fa fa-id-card text-white', class: '' },
    { path: '/sales-details', title: "FPO's Sales Details", icon: 'ni-tv-2 text-white', class: '' },
    { path: '/complaints', title: 'Complaints/Suggestions',  icon: 'fa fa-archive text-white', class: '' },
    { path: '/production-report', title: 'Farmer-wise Production Report',  icon: 'fa fa-plus-square text-white', class: '' },
    { path: '/photographs', title: 'Upload Photographs',  icon: 'fa fa-university text-white', class: '' },
    { path: '/services', title: 'Service/Products',  icon: 'fa fa-archive text-white', class: '' },

    /* { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
