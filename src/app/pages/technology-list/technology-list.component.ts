import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FpoSearchService } from 'src/app/_services/fpo/fpo-search.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss'],
})
export class TechnologyListComponent implements OnInit {
  filterParams = {
    in: '',
    val: '',

    prizes: [],
    type: [],
  };
  // stageOfProdList: [],
  // categoryList: [],

  p = 1;

  filteredData = [];

  selectedDropdown = '';

  stageOfProd: any[] = [
    { name: 'Pre Production/ Sowing', id: 118 },
    { name: 'All stages of Production', id: 129 },
    { name: 'Post harvest', id: 135 },
    { name: 'Sowing', id: 161 },
    { name: 'Sowing and post sowing', id: 170 },
  ];

  priceList: any[] = [
    { name: '5000', id: '5000' },
    { name: '10000', id: '10000' },
    { name: '15000', id: '15000' },
    { name: '20000', id: '20000' },
    { name: '25000', id: '25000' },
    { name: '30000', id: '30000' },
  ];

  typeList: any[] = [
    { name: 'Women friendly', id: 'women friendly' },
    { name: 'Climate Smart', id: 'climate smart' },
  ];

  categoryList: any[] = [
    { name: 'Tractor platform based equipments', id: 118 },
    { name: 'Power based tool equipment', id: 129 },
    { name: 'Manual tools and equipments', id: 129 },
    { name: 'Mobile-app based technology', id: 129 },
    { name: 'Soil-based application technology', id: 129 },
    { name: 'Irrigation technology ', id: 129 },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fpoSearchService: FpoSearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param) {
        this.filterParams.val = param.val.trim();
        this.filterParams.in = param.searchType;
        this.selectedDropdown = param.searchType;
        this.getSearchData();
      }
    });
  }

  getSearchData() {
    this.fpoSearchService
      .getTechSearchList(this.filterParams)
      .subscribe((response) => {
        this.filteredData = response;
      });
  }

  onClickSearch() {
    this.clearAllFilters();

    if (this.selectedDropdown === 'districts') {
      this.router.navigate([
        '/dist',
        this.filterParams.val.trim(),
        this.filterParams.in,
      ]);
      return;
    }

    if (this.selectedDropdown === 'technology') {
      this.getSearchData()
      this.router.navigate([
        '/technology',
        this.filterParams.val.trim(),
        this.filterParams.in,
      ]);
      return;
    }

    this.router.navigate([
      '/products',
      this.filterParams.val.trim(),
      this.filterParams.in,
    ]);
  }

  setItemDetails(item) {
    sessionStorage.setItem('technology', JSON.stringify(item));
    this.router.navigate(['/technology-details']);
  }

  // selectStageOfProd(item: any) {
  //   if (item.is_active) {
  //     this.filterParams.stageOfProdList.push(item.id);
  //   } else {
  //     let index = this.filterParams.stageOfProdList.indexOf(item.id);
  //     this.filterParams.stageOfProdList.splice(index, 1);
  //   }
  //   this.getSearchData();
  // }

  selectPrice(item: any) {
    if (item.is_active) {
      this.filterParams.prizes.push(item.id);
    } else {
      let index = this.filterParams.prizes.indexOf(item.id);
      this.filterParams.prizes.splice(index, 1);
    }
    this.getSearchData();
  }

  selectType(item: any) {
    if (item.is_active) {
      this.filterParams.type.push(item.id);
    } else {
      let index = this.filterParams.type.indexOf(item.id);
      this.filterParams.type.splice(index, 1);
    }
    this.getSearchData();
  }

  // selectCategory(item: any) {
  //   if (item.is_active) {
  //     this.filterParams.categoryList.push(item.id);
  //   } else {
  //     let index = this.filterParams.categoryList.indexOf(item.id);
  //     this.filterParams.categoryList.splice(index, 1);
  //   }
  //   this.getSearchData();
  // }

  clearAllFilters() {
    // this.filterParams.stageOfProdList = [];
    this.filterParams.prizes = [];
    this.filterParams.type = [];
    // this.filterParams.categoryList = [];
  }
}
