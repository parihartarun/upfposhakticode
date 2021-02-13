import { Component, OnInit } from '@angular/core';
import {BuyerSellerService} from '../../../_services/BuyerSeller/buyerseller.services'

@Component({
  selector: 'app-buyeruser',
  templateUrl: './buyeruser.component.html',
  styleUrls: ['./buyeruser.component.css']
})
export class BuyeruserComponent implements OnInit {

  constructor(private buyerservice:BuyerSellerService) { }

  ngOnInit(): void {
  
  
    this.updateProfile();
  }



  updateProfile()
  {
    let masterId = localStorage.getItem('masterId');

    this.buyerservice.editbuyer(masterId,{}).subscribe(res=>{
      console.log(res);
    })
  }
}
