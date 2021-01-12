import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/board-members', title: 'Board Member',  icon: 'fa fa-users text-red', class: '' },
    { path: '/license', title: 'License',  icon: 'fa fa-id-card text-pink', class: '' },
    { path: '/machinary-bank', title: 'Machinary Bank',  icon: 'fa fa-university text-info', class: '' },
    { path: '/storage-unit', title: 'Storage Unit',  icon: 'fa fa-archive text-orange', class: '' },
    { path: '/crop-production', title: "FPO's Crop Production",  icon: 'fa fa-id-card text-pink', class: '' },
    { path: '/sales-details', title: "FPO's Sales Details", icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/production-report', title: 'Production Report',  icon: 'fa fa-plus-square text-orange', class: '' },
    { path: '/photographs', title: 'Upload Photographs',  icon: 'fa fa-university text-info', class: '' },
    { path: '/farmer-details', title: 'Farmer Details',  icon: 'fa fa-users text-red', class: '' },
    { path: '/add-farmer', title: 'Add Farmer',  icon: 'fa fa-plus-square text-primary', class: '' },
    { path: '/land-details', title: 'Land Details',  icon: 'fa fa-archive text-orange', class: '' },
    { path: '/crop-showing-details', title: 'Crop Showing Details',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/production-deatils', title: 'Production Details',  icon: 'fa fa-university text-info', class: '' },

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
