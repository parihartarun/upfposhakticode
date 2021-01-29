import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [];
  noWrapSlides = false;
  showIndicator = true;
  isLoggeIn = false;
  username = '';
  isHome = true;
  constructor(private route: Router, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
    this.slides = [
      { image: '../../../assets/image/img/slider/1.jpg', text: 'Connect with buyers and exporters' },
      { image: '../../../assets/image/img/slider/3.jpg', text: 'Get information about FPO registration' },
      { image: '../../../assets/image/img/slider/4.jpg', text: 'Get information about seeds, fertilizers, agricultural implements etc' }
    ];
  }
  logout() {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    this.route.navigate(['/login']);
    location.reload();
  }

}
