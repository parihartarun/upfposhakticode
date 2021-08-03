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
  };

  p = 1;
  
  filteredData = [];

  selectedDropdown = '';

  /* 
  limit: 6,
    page: 1,
  fpoIds: [],
    cropIds: [],
    cropverietyIds:[],
    districtIds:[],
    inputSuppliersCategories:[],
    inputSupplierIds:[],
    chcFmbIds:[],
	  fertilizerTypeIds:[],
	  brands:[],
	  machineryTypes:[],
    qtymin: null,
    qtymax: null,
    maxRentPerHour:null,
    minRentPerHour:null, */

  stageOfProd: any[] = [
    { name: 'Pre Production/ Sowing', id: 118 },
    { name: 'All stages of Production', id: 129 },
    { name: 'Post harvest', id: 135 },
    { name: 'Sowing', id: 161 },
    { name: 'Sowing and post sowing', id: 170 },
  ];

  priceList: any[] = [
    { name: '0-10000', id: 118 },
    { name: '10000-20000', id: 129 },
    { name: '20000-30000', id: 135 },
    { name: '30000-40000', id: 161 },
    { name: '40000-50000', id: 170 },
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
    if (this.selectedDropdown === 'districts') {
      this.router.navigate([
        '/dist',
        this.filterParams.val.trim(),
        this.filterParams.in,
      ]);
      return;
    }

    if (this.selectedDropdown === 'technology') {
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
}
