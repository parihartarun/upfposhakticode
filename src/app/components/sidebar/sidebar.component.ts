import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    console.log(this.userRole);
  }
}
