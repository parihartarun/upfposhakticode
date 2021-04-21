import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../_services/shared/shared.service';

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
  username = '';

  constructor(public sharedService:SharedService, private router: Router, public translate: TranslateService) { 
    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('hi');
      localStorage.setItem('language', 'hi');
    }
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.username = localStorage.getItem('username');
  }

  useLanguage(language: string) {
    console.log(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  logout() {
    this.sharedService.isUserLoggedIn.next(false);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('tokenType');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    localStorage.removeItem('masterId');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  changePassword() {
  }

}
