import { Component, OnInit, ElementRef } from '@angular/core';
import { departmentROUTES, FPOROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  isLoggeIn = false;
  username = '';
  userRole: any;

  userstring=""
  constructor(location: Location,  private element: ElementRef, private router: Router, public translate: TranslateService) {
    this.location = location;
    translate.setDefaultLang('en');

    // if(localStorage.getItem('language')){
    //   translate.setDefaultLang(localStorage.getItem('language'));
    // }else{
    //   translate.setDefaultLang('hi');
    // }
  }

  ngOnInit() {
    console.log(localStorage.getItem('language'));
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole == 'ROLE_FPC') {
      this.listTitles = FPOROUTES.filter(listTitle => listTitle);
    } else {
      this.listTitles = departmentROUTES.filter(listTitle => listTitle);
    }
    if(sessionStorage.getItem('accessToken') != null){
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout(){
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    this.router.navigate(['/login']);
  }
}
