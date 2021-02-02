import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  isLoggeIn = false;
  username = '';
  isHome = true;
  isOpen = false;
  isDropdownOpen = false;
  navText: any
  constructor(public translate: TranslateService, private route: Router, private _activatedroute: ActivatedRoute) {
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('hi');
    localStorage.setItem('language', 'hi');
  }
  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe(params => {
      if (this.route.url === '/login') {
        this.isHome = true;
        this.navText="Login"
      }
      else if (this.route.url === "/register/1" || this.route.url === "/register/2" || this.route.url === "/register/3" || this.route.url === "/register/4" || this.route.url === "/register/4") {
        this.isHome = true;
        this.navText = "FPO Registertion"
      }
    });
   
    if(sessionStorage.getItem('accessToken') != null){
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
  }

  logout(){
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    this.route.navigate(['/login']);
    location.reload();
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
