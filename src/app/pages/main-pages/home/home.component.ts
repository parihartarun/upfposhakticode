import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentService } from '../../../_services/department/department.service';
import { FpoService } from '../../../_services/fpo/fpo.service';
import { HomeService } from '../../../_services/home/home.service';
import * as $ from 'jquery';

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

  private itemContainer: any;
  private scrollContainer: any;
  private items = [];
  private isNearBottom = true;

  searchValue: string = '';
  searchType: any = 'crop';
  data = { searchValue: this.searchValue, searchType: this.searchType }
  isOpen = false;
  isDropdownOpen = false;
  farmerDetails: any;
  productionDetails: any;
  fpo: any;
  circluar: any;
  constructor(private route: Router, private _activatedroute: ActivatedRoute, public translate: TranslateService, private api: HomeService,
    private _fpo: FpoService, private departmentService: DepartmentService) {
      if(localStorage.getItem('language')){
        translate.setDefaultLang(localStorage.getItem('language'));
      }else{
        translate.setDefaultLang('hi');
        localStorage.setItem('language', 'hi');
      }
  }

  useLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.toggleNavbar();
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      this.username = localStorage.getItem('username');
    }
    this.slides = [
      { image: 'assets/image/img/slider/1.jpg', text: 'Connect with buyers and exporters' },
      { image: 'assets/image/img/slider/3.jpg', text: 'Get information about FPO registration' },
      { image: 'assets/image/img/slider/4.jpg', text: 'Get information about seeds, fertilizers, agricultural implements etc' }
    ];
    this.api.getfarmerDetails().subscribe(h => {
      this.farmerDetails = h
    })
    this.api.getProductionDetails().subscribe(p => {
      this.productionDetails = p
    })
    this._fpo.getAllFpo().subscribe(fpo => {
      this.fpo = fpo.length;
    })
    var $this = this;
    $this.departmentService.getAllCircluarUpload().subscribe(c => {
     // console.log(c);
      $this.circluar = c
    })
    setInterval(function () {
      
    }, 5000);
   
  }
  logout() {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');
    this.route.navigate(['/login']);
    location.reload();

  }
  startSearch(){
    //this.data['searchValue'] = this.searchValue;
    this.data['searchType'] = this.searchType;  
    if(this.data['searchType'] === 'districts'){
      this.route.navigate(['/dist', this.data['searchValue'], this.data['searchType']]);  
      return;
    }
    this.route.navigate(['/products', this.data['searchValue'], this.data['searchType']]);
  }
  selectValue() {
    this.data.searchValue = this.searchValue.trim();
  }
  mobileHeader() {
  }
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }
  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  getClass(index) {
    if (index % 2 == 0) {
      return "item-collection-1"
    }
    else {
      return "item-collection-2"
    }
  }

}
