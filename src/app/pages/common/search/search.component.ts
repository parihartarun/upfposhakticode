import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchValue: string ='';
  searchType: string = 'crop';
  data = { };

  constructor( public router:Router) { }
  searchkey:string;
  ngOnInit(): void {
  }
 
  selectValue() {
    this.data['searchValue'] = this.searchValue;
    this.data['searchType'] = this.searchType;  
    this.router.navigate(['/products', this.searchValue, this.searchType]);
  }
}
