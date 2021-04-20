import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../../_services/shared/shared.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  isOpen = false;
  isHome = '';
  isLoggeIn
  constructor(public sharedService:SharedService, private route: Router, public translate: TranslateService) {
    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('hi');
      localStorage.setItem('language', 'hi');
    }
  }

  ngOnInit(): void {
   this.isHome=this.route.url;

  }
  useLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.toggleNavbar();
  }
  logout() {
    this.sharedService.isUserLoggedIn.next(false);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('tokenType');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    localStorage.removeItem('masterId');
    localStorage.removeItem('userId');
    this.route.navigate(['/login']);
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
}
