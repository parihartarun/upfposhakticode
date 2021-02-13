import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TreeviewItem } from 'ngx-treeview';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth/auth.service';
import { FpoService } from '../../_services/fpo/fpo.service';
import { ProductService } from '../../_services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements AfterViewInit,OnInit {
  isLoggeIn = false;
  currentfpoid:number;
  submitted = false;
  title = 'appBootstrap';  
  loading:boolean=false;
  closeResult: string;
  serachProduct: [];
  dummysearchval:string=''
  routerParameter = '';
  selectedfilters :Array<{name:string,type:string}>=[]
  selecteddists:Array<string>=[];
  selectedquantitis:Array<number>=[];
  p: number = 1; 
  districts: Array<District> = [];
  isDistrict: false;
  searchCriteria: Array<any> = [];
  fpoDetail:any
  quantities:Array<{selected:boolean,minname:string,maxname:string,name:string,type:string,quantity:number,maxQuantity:number}> = [
    { selected:false,minname:"zerotonintynine",maxname:"99",name:"100", type:"qty",quantity: 100, maxQuantity: 0 }, 
    { selected:false, minname:"hundredtohundrednintynine",maxname:"199",name:"200", type:"qty",quantity: 200, maxQuantity: 0 },
    { selected:false, minname:"morethan200",maxname:"200",name:"300", type:"qty",quantity: 300, maxQuantity: 0 },
  ]

  indentcreated:boolean = false;
  parsearchType: string;
  parval: string;
  topsearchval: string;
  items2: any;
  
  // constructor(private modalService: NgbModal, private _rouetr:Router, private _productService: ProductService, private _activatedroute: ActivatedRoute, private api: AuthService) { }
  

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
  treeloaded: boolean=false;
  indentloading: boolean=false;
  currentitem: any;
  indentid: string = "";

  onSelectedChange($event)
  {
    if(this.treeloaded)
{
  console.log("Selected Change Event Called  = "+JSON.stringify($event));
this.selectedfilters = this.selectedfilters.filter(elem=>elem.type!="crop");
$event.forEach(element => {
  this.selectedfilters.push({name:element,type:"crop"});  
});
this.searchWithFilters();
}
if(!this.treeloaded)
{
  this.treeloaded=true;
}
//this.treeloaded == false?true:true;
console.log("Tree loaded status = "+this.treeloaded)

}
onFilterChange($event)
{
  console.log("Selected Filter Event Called  = "+JSON.stringify($event));
}

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  indentForm: FormGroup;
  
  constructor(private modalService: NgbModal, private _rouetr: Router, private _productService: ProductService, private _activatedroute: ActivatedRoute,
    private api: AuthService, private _fpoService: FpoService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }
  ngAfterViewInit(): void {
   this.treeloaded=false;
  }
    
  open(event, content, item):any {
   console.log("Selected Items ="+JSON.stringify(item));
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.id;
    this.indentForm=undefined
   
    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true; 

      this._fpoService.getfpoDetialById(item.id).subscribe(f => {
        this.fpoDetail = f;
    
        this.createIndentForm(this.currentitem);
       
            
      })
      this.modalService.open(content, { ariaLabelledBy: item.id }).result.then((result) => {
         
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.submitted = false;
      });

      
    }
    else {
      this.isLoggeIn=false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.submitted = false;
      });
     
    }

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
  croptypeItem["value"] = cropElement.cropName+"@"+cropTypeElement.verietyName;
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
      this.dummysearchval = params.get('val'); 
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
    this.parval = this.dummysearchval;
    // let httpParams:HttpParams = new HttpParams();     
    //   httpParams = httpParams.append("in",""+this.parsearchType);
    //   httpParams = httpParams.append("val",""+this.topsearchval);
    //   this.selectedfilters.forEach(data=>{
        
    //     httpParams = data.type=="district"? httpParams.append("filterdist",""+data.name):httpParams.append("filterqty",""+data.name);
      
      
    //   });
        
  
      // this.serachProduct=[];
      // this.loading=true;
      // this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
      //   this.serachProduct = s;
      //   this.topsearchval = undefined      
      //   this.loading = false;
      // });
      this.searchWithFilters();  
    }     

searchWithFilters()
{
  let httpParams:HttpParams = new HttpParams();     
    httpParams = httpParams.append("in",""+this.parsearchType);
    httpParams = httpParams.append("val",""+this.parval);
    this.selectedfilters.forEach(data=>{
      
    switch(data.type)
    {
      case 'district':
        httpParams =httpParams.append("filterdist",""+data.name);
      break;
        case 'qty':
          httpParams = httpParams.append("filterqty",""+data.name);
        break;
          case 'crop':
            httpParams =  httpParams.append("filtercrop",""+data.name);
          break;  
    }  
    
       
    
    
    });
      

    this.serachProduct=[];
    this.loading=true;
    this._productService.getSearchProductWithFilters(this.parval, this.parsearchType,httpParams).subscribe(s => {
      this.serachProduct = s;
      console.log('serachProduct',s);
      
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
  logout() {
    console.log("Fpo Id caught = "+this.currentfpoid)
    this.isLoggeIn = true;
    //this.modalService.dismissAll();
    //this.isLoggeIn = true;
    this._fpoService.getfpoDetialById(this.currentfpoid).subscribe(f => {
      this.fpoDetail = f;
      this.createIndentForm(this.currentitem);
     
    })
  }
  getToday():Date
  {
    return new Date();
  }
  createIndentForm(item) {
  

    this.indentForm = this.fb.group({
      fpoId: [this.fpoDetail.fpoId],
      cropVeriety:[item.cropVeriety],
      cropId: [item.cropid],
      fpoDeliveryAddress:[""],
      userId: [this.fpoDetail.userFpo.userId, Validators.required],
      fpoName: [this.fpoDetail.fpoName],
      fpoEmail: [this.fpoDetail.fpoEmail],
      fulfillmentDate: ["", [Validators.required]],
      quantity: [, [Validators.required,Validators.pattern(`[1-9]{1,}`)]],
      
     
    })
  }
  get formControls() {
    return this.indentForm.controls;
  }
  save() {
    
    this.submitted = true;
    // stop here if form is invalid
   
    if (this.indentForm.invalid) {
      return;
    }
    this.indentcreated = true;
    let user = {
      userId: this.fpoDetail.userFpo.userId,
    }
    let cropMaster = {
      cropId: this.indentForm.value.cropId
    }
    let userFpo = {
      userId: this.fpoDetail.userFpo.userId,
    }
    let fpo = {
      fpoId: this.indentForm.value.fpoId,
      userFpo: userFpo
    }
    delete this.indentForm.value.password;
    delete this.indentForm.value.userName;
    delete this.indentForm.value.confirmPassword;
    this.indentForm.value.user = user;
    this.indentForm.value.fpo = fpo;
    this.indentForm.value.cropMaster = cropMaster;
    let date = new Date(this.indentForm.value.fulfillmentDate);
    //let newdate = this.newUYDate(date);

    this.indentloading = true;
    this.indentForm.value.dateOfRegistration = this.datePipe.transform(date, 'dd/MM/yyyy'); //whatever format you need. 
    this.indentForm.value.fulfillmentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.indentForm.value.userId = localStorage.getItem('masterId');
    
    console.log("Master Id Found While submitting the Indent = "+localStorage.getItem('masterId'));
    this._productService.saveIndent(this.indentForm.value).subscribe(response => {
     
      if(response){
        this.indentid = response;
      this.indentForm.reset();
        this.submitted = false;
        this.indentcreated = true;
        this.indentloading = false;
      }
      if (response.message == "Enquiry created Successfully!") {
        //this.toastr.success(response.message);
        
  }
      else {
        //this.toastr.error(response.message);
      }

    })
  }
closeModal()
{
  this.indentcreated=false;
  
  this.modalService.dismissAll();
}

}



interface District {
  id: number;
  district_name: string;
  isDistrict: false;
}
