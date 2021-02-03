import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedfilters :Array<{name:string,type:string}>=[]
  selecteddists:Array<string>=[];
  selectedquantitis:Array<number>=[];
  p: number = 1; 
  districts: Array<District> = [];
  isDistrict: false;
  searchCriteria: Array<any> = [];
  quantities:Array<{selected:boolean,minname:string,maxname:string,name:string,type:string,quantity:number,maxQuantity:number}> = [
    { selected:false,minname:"0",maxname:"99",name:"100", type:"qty",quantity: 100, maxQuantity: 0 }, 
    { selected:false, minname:"100",maxname:"199",name:"200", type:"qty",quantity: 200, maxQuantity: 0 },
    { selected:false, minname:"200",maxname:"299",name:"300", type:"qty",quantity: 300, maxQuantity: 0 },
  ]
  parsearchType: string;
  parval: string;
  topsearchval: string;
  
  constructor(private modalService: NgbModal, private _rouetr:Router, private _productService: ProductService, private _activatedroute: ActivatedRoute, private api: AuthService) { }
    
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
    this.api.getDistrictBystateId(9).subscribe(d => {
      this.districts = new Array()
      this.districts = d

      console.log("districts received"+JSON.stringify(this.districts));
    })
   
    this._activatedroute.paramMap.subscribe(params => {
      let val = params.get('val');
      let searchType = params.get('searchType');
   this.parval = params.get('val');
   this.parsearchType = params.get('searchType');   
   
   this._productService.getSearchProduct(val, searchType).subscribe(s => {
        this.serachProduct = s;
       
      })
    });

    

    this._activatedroute.queryParamMap.subscribe(params=>{

      console.log("Succeess = "+params.get("sampleid"));

})

    
  }
  sampleNavigate()
  {
    this._rouetr.navigate([""]);

  }

  newSearchWithFilters()
  {
    let httpParams:HttpParams = new HttpParams();     
      httpParams = httpParams.append("in",""+this.parsearchType);
      httpParams = httpParams.append("val",""+this.topsearchval);
      this.selectedfilters.forEach(data=>{
        
        httpParams = data.type=="district"? httpParams.append("filterdist",""+data.name):httpParams.append("filterqty",""+data.name);
      });
        
  
      this.serachProduct=[];
      this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
        this.serachProduct = s;
        this.topsearchval = undefined      
      });
  
    }     

searchWithFilters()
{
  let httpParams:HttpParams = new HttpParams();     
    httpParams = httpParams.append("in",""+this.parsearchType);
    httpParams = httpParams.append("val",""+this.parval);
    this.selectedfilters.forEach(data=>{
      
      httpParams = data.type=="district"? httpParams.append("filterdist",""+data.name):httpParams.append("filterqty",""+data.name);
    });
      

    this.serachProduct=[];
    this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
      this.serachProduct = s;
     
    });

  }

  selectDistrct(district: any) {
    console.log("Selected District here "+JSON.stringify(district));
  
    
    if (district.is_active) {
    //this.searchCriteria.push(district)
    this.selecteddists.push(district.district_name);
    this.selectedfilters.push({name:district.district_name,type:"district"})
    console.log("selected districtes" +JSON.stringify(this.selectedfilters)); 
  } else {
     // delete this.searchCriteria[this.searchCriteria.findIndex(item => item.is_active == district.is_active)];
      
      //delete this.selecteddists[this.selecteddists.findIndex(item => item == district.district_name)];
      this.selecteddists = this.selecteddists.filter(item=>item!=district.district_name);
      this.selectedfilters = this.selectedfilters.filter(filter => filter.name!=district.district_name);
      console.log("selected districtes" +JSON.stringify(this.selectedfilters));
    }
    
    this.searchWithFilters();
  
  }
  selectQuantity(q:any) {
    if (q.selected) {
      //this.searchCriteria.push(quantity)
      this.selectedfilters.push({name:q.name,type:q.type})
      console.log("Updated Filter Data = "+JSON.stringify(this.selectedfilters))
    } else {
     // delete this.searchCriteria[this.searchCriteria.findIndex(item => item.is_active == q.maxQuantity)];
      this.selectedfilters = this.selectedfilters.filter(filter=>filter.name!=q.name);
     console.log("Updated Filter Data = "+JSON.stringify(this.selectedfilters))
    }
    this.searchWithFilters();
  }
  
}
interface District {
  id: number;
  district_name: string;
  isDistrict: false;
}
