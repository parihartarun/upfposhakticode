import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TreeviewItem } from 'ngx-treeview';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth/auth.service';
import { FpoService } from '../../_services/fpo/fpo.service';
import {InputSupplierService} from '../../_services/InputSupplier/InputSupplier.services';
import { ProductService } from '../../_services/product/product.service';
import {ChcFmbService} from '../../_services/chc_fmb/chc-fmb.service';
import { FpoSearchService } from 'src/app/_services/fpo/fpo-search.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { element } from 'protractor';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements AfterViewInit, OnInit {
  isLoggeIn = false;
  currentfpoid: number;
  showFilter: any;
  submitted = false;
  title = 'appBootstrap';
  loading: boolean = false;
  closeResult: string;
  serachProduct: [];
  dummysearchval: string = ''
  routerParameter = '';
  selectedfilters: Array<{ name: string, type: string }> = []
  selecteddists: Array<string> = [];
  selectedquantitis: Array<number> = [];
  p: number = 1;
  districts: any = [];
  masterIdentity:any;
  brands: any=[];
  machinetypes:any =[];
  inputSuppliers:any = [];
  fertilizerTypes:any =[]
  isDistrict: false;
  searchCriteria: Array<any> = [];
  fpoDetail: any;
  role:any;
  inpSupDetail:any;
  chcSupDetail:any;
  quantities = [
    { value: 1, minname: "zerotonintynine" },
    { value: 2, minname: "hundredtohundrednintynine" },
    { value: 3, minname: "morethan200" },
  ]

  indentcreated: boolean = false;
  parsearchType: string;
  parval: string;
  topsearchval: string;
  items2: any;
  indentType: any = '';
  selectedDropdown:string = '';
  // constructor(private modalService: NgbModal, private _rouetr:Router, private _productService: ProductService, private _activatedroute: ActivatedRoute, private api: AuthService) { }


  items: any;
  config: any = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500
  }
  cropsTree: any;
  treeloaded: boolean = false;
  indentloading: boolean = false;
  currentitem: any;
  indentid: string = "";
  fpolist: any;
  filterParams = {
    in: '',
    val: '',
    fpoIds: [],
    cropIds: [],
    cropverietyIds:[],
    districtIds:[],
    inputSuppliersCategories:[],
    inputSupplierIds:[],
	  fertilizerTypeIds:[],
	  brands:[],
	  machineryTypes:[],
    qtymin: null,
    qtymax: null,
    maxRentPerHour:null,
    minRentPerHour:null,
    limit: 6,
    page: 1
  };




  options: Options = {
    floor: 0,
    ceil:  201,
    hideLimitLabels: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "" + value;
        case LabelType.High:
          return value > 200 ? value - 1 + "+" : "" + value;
        default:
          return "" + value;
      }
    }
  };



  onSelectedChange(event) {
    this.filterParams.cropverietyIds = [];
      this.filterParams.cropIds = [];
    if (!!event.length) {
      event.filter(el => {
        if (!!el.id) {
          this.filterParams.cropverietyIds.push(el.id);
        } else {
          this.filterParams.cropIds.push(el.p_id)
        }
      });
    } else {
      this.filterParams.cropverietyIds = [];
      this.filterParams.cropIds = [];
    }
    // if (this.filterParams.cropIds.length || this.filterParams.cropverietyIds.length) {
    this.searchData();
    // }
  }



  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


  indentForm: FormGroup;
  districtObserver = this.fpoSearchService.districtObserver.asObservable();
  fpoObserver = this.fpoSearchService.fpoObserver.asObservable();
  cropsObserver = this.fpoSearchService.cropsObserver.asObservable();
  filteredObserver = this.fpoSearchService.filteredObserver.asObservable();

  brandsObserver = this.fpoSearchService.brandsObserver.asObservable();
  machineryTypesObserver = this.fpoSearchService.machineryTypesObserver.asObservable();
  inputSupplierObserver = this.fpoSearchService.inputSupplierObserver.asObservable();
  fertilizerTypesObserver = this.fpoSearchService.fertilizerTypesObserver.asObservable();

  filteredData = [];
  node: any;
  treeView: any = [];

  totalCount: any;
  constructor(private modalService: NgbModal,
    public fpoSearchService: FpoSearchService, private _rouetr: Router, private _productService: ProductService,private _chcfmbService: ChcFmbService ,private _activatedroute: ActivatedRoute,
    private api: AuthService, private _fpoService: FpoService, private _inpSupService:InputSupplierService,private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }


  ngOnInit() {
   // this.selectedDropdown = this.filterParams.in;
    //this.showFilter = this.filterParams.in;
    this._activatedroute.params.subscribe(param => {
      if (param) {
        this.parval = param.val;
        this.parsearchType = param.searchType;
        this.filterParams.val = param.val;
        this.filterParams.in = param.searchType;
        this.selectedDropdown = param.searchType;
        this.dummysearchval = param.val;
        this.fpoSearchService.getDistrict(this.parval, this.parsearchType);
        this.fpoSearchService.getFpo(this.parval, this.parsearchType);
        this.fpoSearchService.getCrops(this.parval, this.parsearchType);
        this.fpoSearchService.getMachineryTypes(this.parval, this.parsearchType);
        this.fpoSearchService.getBrands(this.parval,this.parsearchType);
        this.fpoSearchService.getInputSuppliers(this.parval,this.parsearchType);
        this.fpoSearchService.getFertilizerTypes(this.parval,this.parsearchType);
         this.searchData();
      }
    });
    this.districtObserver.subscribe(data => {
      this.districts = data;
    });

    this.brandsObserver.subscribe(data =>{
      this.brands = data;
      if(this.brands !== null){
        this.brands = this.brands.map((str,index)=>({ id: index+1,name:str}));        
      }
      console.log('brands ==>',this.brands);
    });

    this.machineryTypesObserver.subscribe(data=>{
       this.machinetypes = data;
       console.log("machineTypes==>",this.machinetypes);
    })

    this.inputSupplierObserver.subscribe(data=>{
       this.inputSuppliers = data;
       console.log("Input Suppliers==>",this.inputSuppliers);
    });

    this.fertilizerTypesObserver.subscribe(data=>{
      this.fertilizerTypes = data;
      console.log("FErtilizer Types==>",this.fertilizerTypes);
    })

    this.fpoObserver.subscribe(data => {
      this.fpolist = data;

    });
//    this.fpoObserver.subscribe()
    this.filteredObserver.subscribe(data => {
      if (data) {
        this.filteredData = data.page;
        this.totalCount = data.totalElements;
        // for (let index = 1; index <= data.totalElements / 20; index++) {
        //   this.totalCount.push(index);
        // }
        // if (data.totalElements % 20 !== 0) {
        //   this.totalCount.push(this.totalCount.length + 1);
        // }
      }
    });
    this.cropsObserver.subscribe(data => {
      console.log('Crops Observer==>',data);
      if(data !== null && data.length !== 0){
          console.log("Here");
          this.treeView =[];
        data.forEach(el => {
              if (el) {
                this.node = {};
                this.node.text = el.name;
                this.node.value = el.id;
                this.node.collapsed = true;
                // this.node.checked = false;
                var childnode = []
                el.cropVeriety.forEach(child => {
                  childnode.push({
                    text: child.verietyName,
                    value: { p_id: el.id, id: child.verietyId },
                    checked: false
                  })
                });
                this.node.children = childnode;
                this.treeView.push(new TreeviewItem(this.node))
              }
            });
       }else {
          this.treeView = [];
         } 
    });
  }
  searchData() {
    this.fpoSearchService.searchData(this.filterParams);
    console.log(this.filterParams);
  }
  fetchnewData() {
    this.clearAllFilters();
    this.selectedDropdown = this.filterParams.in;
    console.log("Selected Drop",this.selectedDropdown)
    if(this.selectedDropdown === 'districts'){
      this._rouetr.navigate(['/dist',this.filterParams.val,this.filterParams.in]);
      return;
    }
    this.searchData();
    this._rouetr.navigate(['/products', this.filterParams.val, this.filterParams.in]);
  }
  ngAfterViewInit(): void {
    
    this.treeloaded = false;
  }
  // ngDoCheck() {
  //   this.showFilter = this.filterParams.in;
  // }
  openTestModal(content) {
    this.modalService.open(content)
  }
  open(event, content, item): any {
    console.log("Selected Items =" + JSON.stringify(item));
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.fpoid;
    this.indentForm = undefined

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;

      this._fpoService.getfpoDetialById(item.fpoid).subscribe(f => {
        this.fpoDetail = f;
        console.log(this.fpoDetail);
        this.createIndentForm(this.currentitem);


      })
      this.modalService.open(content, { ariaLabelledBy: item.fpoid }).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });


    }
    else {
      this.isLoggeIn = false;
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
      return `with: ${reason}`;
    }
  }

  // open function for Insecticide Indent Form
  openOne(event, content, item): any {
    console.log("Selected Items =" + JSON.stringify(item));
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.inputsupplierid;
    this.indentForm = undefined

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;

      this._inpSupService.getSupplierProfileData(item.inputsupplierid).subscribe(f => {
        this.inpSupDetail = f;
        console.log("InpSup Detail",this.inpSupDetail);
        this.createIndentFormInputSup(this.currentitem);

      })
      this.modalService.open(content, { ariaLabelledBy: item.inputsupplierid }).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });


    }
    else {
      this.isLoggeIn = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });

    }

  }

  //open function for Fertilizer indent form

  openTwo(event, content, item){
    this.currentitem = item;
    this.indentloading = false;
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.inputsupplierid;
    this.indentForm = undefined

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;

      this._inpSupService.getSupplierProfileData(item.inputsupplierid).subscribe(f => {
        this.inpSupDetail = f;
        console.log("InpSup Detail",this.inpSupDetail);
        console.log("Current Item",this.currentitem);
        this.createIndentFormFertilizer(this.currentitem);

      })
      this.modalService.open(content, { ariaLabelledBy: item.inputsupplierid }).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });


    }
    else {
      this.isLoggeIn = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });

    }
  }
 
  // Open Function for Seed Indent Form
  openThree(event, content, item){
    this.currentitem = item;
    this.indentloading = false;
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.inputsupplierid;
    this.indentForm = undefined

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;

      this._inpSupService.getSupplierProfileData(item.inputsupplierid).subscribe(f => {
        this.inpSupDetail = f;
        console.log("InpSup Detail",this.inpSupDetail);
        console.log("Current Item",this.currentitem);
      this.createIndentFormSeed(this.currentitem);

      })
      this.modalService.open(content, { ariaLabelledBy: item.inputsupplierid }).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });


    }
    else {
      this.isLoggeIn = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });

    }
  }
   // Open Function for Machinery indent Form
   openFour(event, content, item){

    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.vendorid;
    this.role = item.role;
    this.indentForm = undefined

    if (sessionStorage.getItem('accessToken') != null) {
      this.isLoggeIn = true;
      if(this.role ==='ROLE_INPUTSUPPLIER'){
        this._inpSupService.getSupplierProfileData(item.vendorid).subscribe(f => {
          this.inpSupDetail = f;
          console.log("InpSup Detail",this.inpSupDetail);
          console.log("Current Item",this.currentitem);
          this.createIndentformMachinary(this.currentitem);
  
        })
      }
      if(this.role ==='ROLE_CHCFMB'){
        this._chcfmbService.getCHCSupplierProfileData(item.vendorid).subscribe(f => {
          this.chcSupDetail = f;
          console.log("CHCSup Detail",this.chcSupDetail);
          console.log("Current Item",this.currentitem);
         this.createIndentformMachinaryCHC(this.currentitem);
        })
      } 
      this.modalService.open(content, { ariaLabelledBy: item.inputsupplierid }).result.then((result) => {

        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });


    }
    else {
      this.isLoggeIn = false;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.submitted = false;
      });

    }

   }
  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach(set => {

      set.checked = false;
      set.collapsed = true;
      let sampleitm = new TreeviewItem(set);
      // sampleitm.setCollapsedRecursive(false);
      sampleitm.collapsed = true;
      itemsArray.push(new TreeviewItem(sampleitm))
    });
    return itemsArray;
  }
  sampleNavigate() {
    this._rouetr.navigate([""]);

  }

  searchWithFilters() {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append("in", "" + this.parsearchType);
    httpParams = httpParams.append("val", "" + this.parval);
    this.selectedfilters.forEach(data => {

      switch (data.type) {
        case 'district':
          httpParams = httpParams.append("filterdist", "" + data.name);
          break;
        case 'qty':
          httpParams = httpParams.append("filterqty", "" + data.name);
          break;
        case 'crop':
          httpParams = httpParams.append("filtercrop", "" + data.name);
          break;
        case 'fpo':
          httpParams = httpParams.append("fpo", "" + data.name);
          break;
      }




    });


   this.serachProduct = [];
    this.loading = true;
    this._productService.getSearchProductWithFilters(this.parval, this.parsearchType, httpParams).subscribe(s => {
      this.serachProduct = s;
      console.log('serachProduct', s);

      this.loading = false;
    });

  }

  selectDistrct(district: any) {
    if (district.is_active) {
      this.filterParams.districtIds.push(district.id);
    } else {
      this.filterParams.districtIds.splice(this.filterParams.districtIds.indexOf(district.id), 1);
    }
    this.searchData();
  }

  selectInputSupplier(inputSupplier:any){
    if(inputSupplier.is_active){
      this.filterParams.inputSupplierIds.push(inputSupplier.id)
    }else{
      this.filterParams.inputSupplierIds.splice(this.filterParams.inputSupplierIds.indexOf(inputSupplier.id), 1);
    }
    this.searchData();
  }

  selectFertilizerType(fertilizerType:any){
        if(fertilizerType.is_active){
            this.filterParams.fertilizerTypeIds.push(fertilizerType.id);
        }else{
            this.filterParams.fertilizerTypeIds.splice(this.filterParams.fertilizerTypeIds.indexOf(fertilizerType.id), 1);
        }
        this.searchData();
  }

  selectMachineType(machineType: any) {
    if (machineType.is_active) {
      console.log(machineType);
      //this.filterParams.machineryTypes
      this.filterParams.machineryTypes.push(machineType.id);
    } else {
      this.filterParams.machineryTypes.splice(this.filterParams.machineryTypes.indexOf(machineType.id), 1);
    }
    this.searchData();
  }

  //selectInputSupplliers()  
  selectBrand(brand: any){
    if (brand.is_active) {
      this.filterParams.brands.push(brand.name);
    } else {
      this.filterParams.brands.splice(this.filterParams.brands.indexOf(brand.name), 1);
    }
    this.searchData();
  }

  selectFpo(fpo: any) {
    if (fpo.is_active) {
      this.filterParams.fpoIds.push(fpo.id);
    } else {
      this.filterParams.fpoIds.splice(this.filterParams.fpoIds.indexOf(fpo.id), 1);
    }
    this.searchData();

  }
  selectQuantity(q: any) {
    this.searchData();
  }
  // logout for crop
  logout() {
    console.log("Fpo Id caught = " + this.currentfpoid)
    this.isLoggeIn = true;
    //this.modalService.dismissAll();
    //this.isLoggeIn = true;
    this._fpoService.getfpoDetialById(this.currentfpoid).subscribe(f => {
      this.fpoDetail = f;
      this.createIndentForm(this.currentitem);

    })
  }

  // logout for fertilizer
   logoutFert(){
        console.log("Fpo Id caught = " + this.currentfpoid)
        this.isLoggeIn = true;
        this._inpSupService.getSupplierProfileData(this.currentfpoid).subscribe(f => {
          this.inpSupDetail = f; 
          this.createIndentFormFertilizer(this.currentitem);
        })
    }

  // logout for Insecticide  
   logoutIns(){
    console.log("Fpo Id caught = " + this.currentfpoid)
    this.isLoggeIn = true;
    this._inpSupService.getSupplierProfileData(this.currentfpoid).subscribe(f => {
      this.inpSupDetail = f;
      this.createIndentFormInputSup(this.currentitem);
    })
   }

   // logout for Seeds
   logoutSeed(){
    console.log("Fpo Id caught = " + this.currentfpoid)
    this.isLoggeIn = true;
    this._inpSupService.getSupplierProfileData(this.currentfpoid).subscribe(f => {
      this.inpSupDetail = f;
      this.createIndentFormSeed(this.currentitem);
    })
   }

   logoutMachinaryInputSup(){
    console.log("Fpo Id caught = " + this.currentfpoid)
    this.isLoggeIn = true;
    this._inpSupService.getSupplierProfileData(this.currentfpoid).subscribe(f => {
      this.inpSupDetail = f;
      this.createIndentformMachinary(this.currentitem);
    })
   }

   logoutMachinaryCHC(){
    console.log("Fpo Id caught = " + this.currentfpoid)
    this.isLoggeIn = true;

    this._chcfmbService.getCHCSupplierProfileData(this.currentfpoid).subscribe(f => {
      this.chcSupDetail = f;
     this.createIndentformMachinaryCHC(this.currentitem);
    })
   }

  getToday(): Date {
    return new Date();
  }

  // quantityFilter() {
  //   this.searchData();
  // }
  createIndentForm(item) {
    console.log("this.fpoDetail.userFp",this.fpoDetail.userFpo?.userId);
    
    this.indentForm = this.fb.group({
      fpoId: [this.fpoDetail.fpoId],
      cropVeriety: [item.varietyid],
      cropId: [item.cropid],
      fpoDeliveryAddress: ["", Validators.required],
      userId: [this.fpoDetail.userFpo?.userId, Validators.required],
      fpoName: [this.fpoDetail.fpoName],
      fpoEmail: [this.fpoDetail.fpoEmail],  //^[0+-]?([1-9]*\\.)?\\d+$
      fulfillmentDate: ["", [Validators.required]],//^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$
      quantity: [, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
      createdBy:[0],
      masterId: [0]

    })
  }
  get formControls() {
    return this.indentForm.controls;
  }

  // Indent Form for Input Suppliers
  createIndentFormInputSup(item){
    
    this.indentForm = this.fb.group({
        createdBy:localStorage.getItem('masterId'),//Users masterId
        deliveryaddress:["",Validators.required],
        indentQty:[, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
        insecticideTypeId: this.fb.group({
          id:[item.itemtypeid],
          insecticideType:[item.itemtype] 
        }), 
        manufacturerName:[""],
        masterId:[item.inputsupplierid],
        requestedDateTime:["",Validators.required],
        roleRefId:localStorage.getItem('roleRefId'), // User roleRefId
        status:["active"],
        userId:localStorage.getItem('userId')   
    })


  }

  // Indent Form for Fertilizers
  createIndentFormFertilizer(item){

      this.indentForm = this.fb.group({
          companyName:[""],
          createdBy:localStorage.getItem('masterId'),
          deliveryaddress:["",Validators.required],
          fertilizeName:this.fb.group({
            id:[item.itemnameid],
            name:[item.itemname]
          }),
          fertilizerGrade:[item.grade],
          fertilizerType:this.fb.group({
            id:[item.itemtypeid],
            type:[item.itemtype]
          }),
          indentQty:[, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
          masterId:[item.inputsupplierid],
          reason:[""],
          requestedDateTime:["",Validators.required],
          roleRefId:localStorage.getItem('roleRefId'),
          status:["active"],
          userId:localStorage.getItem('userId') 

      })

  }

  // Create Indent Form Seed
  createIndentFormSeed(item){
      this.indentForm = this.fb.group({
        createdBy:localStorage.getItem('masterId'),
        cropId:this.fb.group({
          cropId:[item.cropid],
          cropName:[item.crop]
        }),
        verietyId:this.fb.group({
          verietyId:[item.cropverietyid],
          verietyName:[item.cropveriety]
        }),
        deliveryaddress:["",Validators.required],
        indentQty:[, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
        masterId:[item.inputsupplierid],
        requestedDateTime:["",Validators.required],
        roleRefId:localStorage.getItem('roleRefId'),
        status:["active"],
        userId:localStorage.getItem('userId')
      })
  }

  // Create Indent Form for Machinary Input Supplier
   createIndentformMachinary(item){
        this.indentForm = this.fb.group({
          createdBy:localStorage.getItem('masterId'),
          deliveryaddress:["",Validators.required],
          enqid: [0],
          indentQty:[, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
          machineryNameId:[item.machinenameid],
          machineryName: [item.machinename],
          machineryTypId : [item.machinetypeid],
          machineryType:[item.machinetype],
          masterId:[item.vendorid],
          noOfDays: [,[Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
          requestedDateTime:["",Validators.required],
          roleRefId:localStorage.getItem('roleRefId'),
          status:["active"],
          userId:localStorage.getItem('userId')
        })
   }

   // Create Indent Form for Machinary CHC Supplier
   createIndentformMachinaryCHC(item){
    this.indentForm = this.fb.group({
      createdBy:localStorage.getItem('masterId'),
      deliveryaddress:["",Validators.required],
      enqid: [0],
      indentQty:[, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
      machineryNameId:[item.machinenameid],
      machineryName: [item.machinename],
      machineryTypId : [item.machinetypeid],
      machineryType:[item.machinetype],
      masterId:[item.vendorid],
      noOfDays: [,[Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],
      requestedDateTime:["",Validators.required],
      roleRefId:localStorage.getItem('roleRefId'),
      status:["active"],
      userId:localStorage.getItem('userId')
    })
   }


  // uncheckAllItems(items) {
  //   items.forEach(element => {
  //   element.checked = false;
  //   element.collapsed = true
  //   if (element.internalChildren) {
  //     this.uncheckAllItems(element.internalChildren);
  //   }
  // });}

  clearAllFilters(){
    // Clean all the filters 
    this.filterParams.fpoIds =[];
    this.filterParams.districtIds =[];
    this.filterParams.machineryTypes=[];
    this.filterParams.fertilizerTypeIds=[];
    this.filterParams.inputSupplierIds =[];
    this.filterParams.brands=[];
    this.filterParams.cropverietyIds=[];
 
    
   // this.uncheckAllItems(this.treeView)

    if(this.districts !== null){
      this.districts.forEach(element => {
        element.is_active = false;
      });
    }
    if(this.machinetypes !== null){
      this.machinetypes.forEach(element => {
        element.is_active = false;
      });
    }
    if(this.fertilizerTypes !== null){
      this.fertilizerTypes.forEach(element =>{
        element.is_active = false;
      })
    }
    if(this.inputSuppliers !== null){
      this.inputSuppliers.forEach(element =>{
        element.is_active = false;
      });
    }

   if(this.brands !== null){
        this.brands.forEach(element =>{
          element.is_active = false;
        })
    }
  
    if(this.fpolist !== null){
      this.fpolist.forEach(element =>{
        element.is_active = false;
      })
    }

    // Cleans the ngx tree filter upto depth 1
    if(this.treeView !== null){
          this.treeView.forEach(element =>{
            if (element.internalChecked === true){
                element.internalChildren.forEach(elem =>{
                  elem.internalChecked = false;
                });
                element.internalChecked = false;
                element.internalCollapsed =true;
            }
          });
    }

  }

  clearFilters() {
    // this.quantities.forEach(element => {
    //   element.selected = false;
    // })
    this.districts.forEach(element => {
      element.is_active = false;
    })
    this.machinetypes.foreach(element => {
      element.is_active = false;
    })
    this.fpolist.forEach(element => {
      element.is_active = false;
    })
    this.items.forEach(element => {
      element.checked = false;
      if (element.children) {
        element.children.forEach(childelement => {
          childelement.checked = false;
        });
      }
    });
    this.selectedfilters = [];
    this.searchWithFilters();
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
    this.indentForm.value.createdBy = localStorage.getItem('masterId');
    this.indentForm.value.masterId = localStorage.getItem('masterId');
   
    


    console.log("Master Id Found While submitting the Indent = " + localStorage.getItem('masterId'));
    this._productService.saveIndent(this.indentForm.value).subscribe(response => {

      if (response) {
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

  // save modal form for Input Suppliers Insecticide

  saveInp() {

   
    this.submitted = true;
    // stop here if form is invalid

    if (this.indentForm.invalid) {
      return;
    }
    this.indentcreated = true;
    let date = new Date(this.indentForm.value.requestedDateTime);
    // //let newdate = this.newUYDate(date);

       this.indentloading = true;
  
       
        this.indentForm.value.requestedDateTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    // this.indentForm.value.userId = localStorage.getItem('masterId');
    // this.indentForm.value.createdBy = localStorage.getItem('masterId');
    // this.indentForm.value.masterId = localStorage.getItem('masterId');
   
    console.log(this.indentForm.value);
    


    // console.log("Master Id Found While submitting the Indent = " + localStorage.getItem('masterId'));
     this._productService.saveIndentInputSuppliers(this.indentForm.value).subscribe(response => {

            if (response) {
               this.indentid = JSON.parse(response).message;
               this.indentForm.reset();
               this.submitted = false;
               this.indentcreated = true;
               this.indentloading = false;
             }
        //   if (response.message == "Enquiry created Successfully!") {
        //     //this.toastr.success(response.message);

        //   }
        //   else {
        //     //this.toastr.error(response.message);
        //   }

        });
  }

  saveInpFert(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.indentForm.invalid) {
      return;
    }
    this.indentcreated = true;
    let date = new Date(this.indentForm.value.requestedDateTime);
       this.indentloading = true;
    this.indentForm.value.requestedDateTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(this.indentForm.value);
    this._productService.saveIndentInputSuppliersFertilizer(this.indentForm.value).subscribe(response => {

      if (response) {
         this.indentid = JSON.parse(response).message;
         this.indentForm.reset();
         this.submitted = false;
         this.indentcreated = true;
         this.indentloading = false;
       }
    });

  }

  saveInpSeed(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.indentForm.invalid) {
      return;
    }
    let date = new Date(this.indentForm.value.requestedDateTime);
    this.indentloading = true;
    this.indentForm.value.requestedDateTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(this.indentForm.value);
    this._productService.saveIndentInputSuppliersSeeds(this.indentForm.value).subscribe(response => {

      if (response) {
         this.indentid = JSON.parse(response).message;
         this.indentForm.reset();
         this.submitted = false;
         this.indentcreated = true;
         this.indentloading = false;
       }
    });

  }

  saveMachinaryInpSuppliers(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.indentForm.invalid) {
      return;
    }
    let date = new Date(this.indentForm.value.requestedDateTime);
    this.indentloading = true;
    this.indentForm.value.requestedDateTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(this.indentForm.value);

    this._productService.saveIndentInputSuppliersMachinery(this.indentForm.value).subscribe(response => {

      if (response) {
         this.indentid =JSON.parse(response).message;
         this.indentForm.reset();
         this.submitted = false;
         this.indentcreated = true;
         this.indentloading = false;
       }
    });
    
  }

  saveMachinaryCHCSuppliers(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.indentForm.invalid) {
      return;
    }
    let date = new Date(this.indentForm.value.requestedDateTime);
    this.indentloading = true;
    this.indentForm.value.requestedDateTime = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(this.indentForm.value);
    this._productService.saveCHCInputSupplierMachinery(this.indentForm.value).subscribe(response => {
          if (response) {
            this.indentid = JSON.parse(response).message;
            this.indentForm.reset();
            this.submitted = false;
            this.indentcreated = true;
            this.indentloading = false;
          }
    });
  }

  closeModal() {
    this.indentcreated = false;

    this.modalService.dismissAll();
  }

}



interface District {
  id: number;
  district_name: string;
  isDistrict: false;
  is_active: boolean;
}

interface Treeview {
  text: any,
  value: any,
  children: [
    {
      text: any,
      value: any,
    }
  ]
}
