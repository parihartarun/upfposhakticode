import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TreeviewItem } from 'ngx-treeview';
import { AuthService } from '../../_services/auth/auth.service';
import { ProductService } from '../../_services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  title = 'appBootstrap';  
  loading:boolean=false;
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
  items2: any;
  
  constructor(private modalService: NgbModal, private _rouetr:Router, private _productService: ProductService, private _activatedroute: ActivatedRoute, private api: AuthService) { }
  

  items: any;
config:any = {
  hasAllCheckBox: false,
  hasFilter: false,
  hasCollapseExpand: false,
  decoupleChildFromParent: false,
  maxHeight: 500
}
  simpleItems = {
    text: 'parent-1',
    value: 'p1',
    children: [
 {
        text: 'child-p1c1',
        value: {name:"p1c1",child:"p1c1"},
      },
      {
        text: 'child-p1c2',
        value: {name:"p1c2",child:"p1c2"},
      },
    ]
  };

  simpleItems2 = {
    text: 'parent-2',
    value: 'p2',
    collapsed: true,
    children: [
      {
        text: 'child-p2c1',
        value: {name:"p2c1",child:"p2c1"},
      },
      {
        text: 'child-p2c2',
        value: {name:"p2c2",child:"p2c2"},
      },
    ]
  };

  onSelectedChange($event)
  {
console.log("Selected Change Event Called  = "+JSON.stringify($event));
  }
onFilterChange($event)
{
  console.log("Selected Filter Event Called  = "+JSON.stringify($event));
}

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
  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach(set => {
      set.checked = false;
      set.collapsed = false;
      itemsArray.push(new TreeviewItem(set))
    });
    return itemsArray;
  }
  ngOnInit() {
   
   this.api.getDistrictBystateId(9).subscribe(d => {
      this.districts = new Array()
      this.districts = d
      
    })
   
    this.api.getCrops().subscribe(c => {
      this.items2=[];
      console.log("Crops received"+JSON.stringify(c));
   
   c.forEach(cropElement => {
    let itm:any ={}
itm["text"] = cropElement.cropName;
itm["value"] = cropElement.cropName;

console.log("Item Packed as here"+JSON.stringify(itm));

let croptypes = [];

 cropElement.cropTypes.forEach(cropTypeElement => {
 
let croptypeItem = {};
  croptypeItem["text"] = cropTypeElement.verietyName;
  croptypeItem["value"] = cropTypeElement.verietyName+","+cropElement.cropName;
  croptypeItem["checked"] = false;
  croptypeItem["collapsed"] = false;
  croptypes.push(croptypeItem);  
});
console.log("Packed Object for the Crop" + cropElement.cropName+"is as follows = "+JSON.stringify(croptypes));
  
  // console.log("Crop Types of the Crop"+JSON.stringify(croptypes))
   itm["children"] = croptypes;


     this.items2.push(itm);
  
  });  
// console.log("")
 this.items = this.getItems([...this.items2]);
  })

    this._activatedroute.paramMap.subscribe(params => {
      let val = params.get('val');
      let searchType = params.get('searchType');
   this.parval = params.get('val');
   this.parsearchType = params.get('searchType');   
      this.loading=true;
     this._productService.getSearchProduct(val, searchType).subscribe(s => {
        this.serachProduct = s;
        this.loading=false;
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
      this.loading=true;
      this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
        this.serachProduct = s;
        this.topsearchval = undefined      
        this.loading = false;
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
    this.loading=true;
    this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
      this.serachProduct = s;
      this.loading=false;
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
