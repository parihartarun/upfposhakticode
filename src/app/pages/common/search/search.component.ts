import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( public router:Router) { }
  searchkey:string;
  ngOnInit(): void {
  }

  search(){
    //this.router.navigate(['fpo/dashboard']);
    this.router.navigate(["/products/"+this.searchkey+"/any"]);    
  }
}
