import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [];
  noWrapSlides = false;
  showIndicator = true;

  ngOnInit(): void {
    this.slides = [
      { image: '../../../assets/newdesign/img/slider/1.jpg', text: 'Connect with buyers and exporters' },
      { image: '../../../assets/newdesign/img/slider/3.jpg', text: 'Get information about FPO registration' },
      { image: '../../../assets/newdesign/img/slider/4.jpg', text: 'Get information about seeds, fertilizers, agricultural implements etc' }
    ];
  }

}
