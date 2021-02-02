import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../_services/auth/auth.service';
import { ProductService } from '../../_services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  title = 'appBootstrap';  
  closeResult: string;
  serachProduct: [];
  routerParameter = '';
  p: number = 1; 
  districts: Array<District> = [];
  isDistrict: false;
  searchCriteria: Array<any> = [];
  quantities = [{ quantity: 100, maxQuantity: 0 }, { quantity: 300, maxQuantity: 0 }, { quantity: 500, maxQuantity: 0 }]
  
  constructor(private modalService: NgbModal, private _productService: ProductService, private _activatedroute: ActivatedRoute, private api: AuthService) { }
    
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.api.getDistrict().subscribe(d => {
      this.districts = new Array()
      this.districts = d
    })
   
    this._activatedroute.paramMap.subscribe(params => {
      let val = params.get('val');
      let searchType = params.get('searchType');
      this._productService.getSearchProduct(val, searchType).subscribe(s => {
        this.serachProduct = s;
       
      })
    });
    
  }
  selectDistrct(district: any) {
    if (district.is_active) {
      this.searchCriteria.push(district)
    } else {
      delete this.searchCriteria[this.searchCriteria.findIndex(item => item.is_active == district.is_active)];
     
    }
  }
  selectQuantity(quantity:any) {
    if (quantity.maxQuantity) {
      this.searchCriteria.push(quantity)
    } else {
      delete this.searchCriteria[this.searchCriteria.findIndex(item => item.is_active == quantity.maxQuantity)];

    }
  }

}
interface District {
  id: number;
  district_name: string;
  isDistrict: false;
}
