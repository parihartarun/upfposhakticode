import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../_services/shared/shared.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('sticky-nav');
    } else {
      element.classList.remove('sticky-nav');
    }
  }
  isLoggeIn = false;
  username = '';
  isHome = true;
  isOpen = false;
  isDropdownOpen = false;
  navText: any
  isHomePage = ''
  constructor(public sharedService:SharedService, public translate: TranslateService, private route: Router, private _activatedroute: ActivatedRoute) {
    console.log(localStorage.getItem('language'));
    this.sharedService.isUserLoggedIn.subscribe( value => {
      console.log(value);
        this.isLoggeIn = value;
    });
    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('hi');
      localStorage.setItem('language', 'hi');
    }

  }
  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  ngOnInit(): void {
    this.isHomePage = this.route.url;
    console.log('homepage', this.isHomePage);

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    } else{
      this.isLoggeIn = false;

    }

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
  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
