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
import { ProductService } from '../../_services/product/product.service';
import { FpoSearchService } from 'src/app/_services/fpo/fpo-search.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements AfterViewInit, OnInit {
  isLoggeIn = false;
  currentfpoid: number;
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
  isDistrict: false;
  searchCriteria: Array<any> = [];
  fpoDetail: any
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

  onSelectedChange(event) {
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
  filteredData = [];
  node: any;
  treeView: any = [];
  filterParams = {
    in: '',
    val: '',
    page: 1,
    limit: 20,
    cropverietyIds: [],
    districtIds: [],
    fpoIds: [],
    quantity: [],
    cropIds: []
  };
  totalCount: any;
  constructor(private modalService: NgbModal,
    public fpoSearchService: FpoSearchService, private _rouetr: Router, private _productService: ProductService, private _activatedroute: ActivatedRoute,
    private api: AuthService, private _fpoService: FpoService, private fb: FormBuilder, private datePipe: DatePipe, private toastr: ToastrService) { }


  ngOnInit() {

    this._activatedroute.params.subscribe(param => {
      if (param) {
        this.parval = param.val;
        this.parsearchType = param.searchType;
        this.filterParams.val = param.val;
        this.filterParams.in = param.searchType;
        this.dummysearchval = param.val;
        this.fpoSearchService.getDistrict(this.parval, this.parsearchType);
        this.fpoSearchService.getFpo(this.parval, this.parsearchType);
        this.fpoSearchService.getCrops(this.parval, this.parsearchType);
        // this.searchData();
      }
    });
    this.districtObserver.subscribe(data => {
      this.districts = data;
    });
    this.fpoObserver.subscribe(data => {
      this.fpolist = data;

    });
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
      if (!!data.length) {
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
        })
      } else {
        this.treeView = [];
      }
    });
  }
  searchData() {
    this.fpoSearchService.searchData(this.filterParams);
  }
  fetchnewData() {
    this.searchData();
    this._rouetr.navigate(['/products', this.filterParams.val, this.filterParams.in]);
  }
  ngAfterViewInit(): void {
    this.treeloaded = false;
  }

  open(event, content, item): any {
    console.log("Selected Items =" + JSON.stringify(item));
    this.currentitem = item;
    this.indentloading = false;
    this.currentfpoid = item.id;
    this.indentForm = undefined

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
  getToday(): Date {
    return new Date();
  }
  createIndentForm(item) {

    this.indentForm = this.fb.group({
      fpoId: [this.fpoDetail.fpoId],
      cropVeriety: [item.cropVeriety],
      cropId: [item.cropid],
      fpoDeliveryAddress: ["", Validators.required],
      userId: [this.fpoDetail.userFpo?.userId, Validators.required],
      fpoName: [this.fpoDetail.fpoName],
      fpoEmail: [this.fpoDetail.fpoEmail],  //^[0+-]?([1-9]*\\.)?\\d+$
      fulfillmentDate: ["", [Validators.required]],//^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$
      quantity: [, [Validators.required, Validators.pattern(`^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$`)]],


    })
  }
  get formControls() {
    return this.indentForm.controls;
  }

  clearFilters() {
    // this.quantities.forEach(element => {
    //   element.selected = false;
    // })
    this.districts.forEach(element => {
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
