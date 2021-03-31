import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { ProductService } from 'src/app/_services/product/product.service';
import { BuyerSellerService } from "src/app/_services/BuyerSeller/buyerseller.services";
import { ChcFmbService } from 'src/app/_services/chc_fmb/chc-fmb.service';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';

@Component({
  selector: 'app-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.css']
})
export class IndentComponent implements OnInit {
  indents: any = [];
  loading:boolean=false;
  p: number = 1;
  userid:number;
  userRole: string;
  masterId: string;
  indentForm: FormGroup;
  currentItem: any;

  public fertilizerIndents = true;
  public insecticesIndents = false;
  public machineryIndents = false;
  public seedsIndents = false;

  machineryIndent:Array<any>=[];
  fertilizerIndent:Array<any>=[];
  insecticideIndent:Array<any>=[];
  machineryIndentSupplier:Array<any>=[];
  seedIndent:Array<any>=[];
  
  constructor(private fb: FormBuilder,private _productService: ProductService,private modalService: NgbModal,private auth:AuthService,private fpoService:FpoService,
    private _buyerService: BuyerSellerService,private toastr: ToastrService, private api:ChcFmbService,
    private supplierService:InputSupplierService) { }

  ngOnInit(): void {
    this.getIdent()
    this.getIndentDetailsForChc();
    this.getIndentDetailsForSupplier();
   
  }
  opendialog($event,content,item)
  {
   this.currentItem = item;
    
    this.indentForm = this.fb.group({
      status: [undefined,Validators.required],
      soldQuantity:[undefined,[Validators.required,Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]],
      reason: [""],     
    })

    this.modalService.open(content);
  }

  getIdent() {
    
    this.loading = true;
    this.indents = [ ],
    // localStorage.setItem('userRole', response.userRole);
    //localStorage.setItem('masterId', response.masterId);
    this.userRole = localStorage.getItem('userRole');
    this.masterId = localStorage.getItem('masterId');
    
        if (this.userRole == 'ROLE_FPC') {  
      this.fpoService.getIndentByFpoId(this.masterId).subscribe(data=>{
        this.indents = data;
        this.loading = false;
      })

    }  else {
      this.fpoService.getIndentByUserId(this.masterId).subscribe(data=>{
        this.indents = data;
        this.loading = false;
      })

    }


  }

  deleteIndent(indentId){
    this._buyerService.deleteIndent(indentId).subscribe(data=>{
      this.toastr.success('Successfully cancelled');
      this.getIdent();  
    })
  }

  getIndentDetailsForChc(){
    this.api.getIndentDetails(localStorage.getItem('masterId')).subscribe(response => {
      console.log('getIndentDetailsForChc',response);
      this.machineryIndent = response.machineryIndent;
    },
      err => {
        console.log(err)
      }
    );
  }

  getIndentDetailsForSupplier(){
    this.supplierService.getIndentDetails(localStorage.getItem('masterId')).subscribe(response => {
      console.log('getIndentDetailsForSupplier',response);
      this.fertilizerIndent = response.fertilizerIndent;
      this.insecticideIndent = response.insecticideIndent;
      this.machineryIndentSupplier = response.machineryIndent;
      this.seedIndent = response.seedIndent;
    },
      err => {
        console.log(err)
      }
    );
  }

  showIndents(tab){
    this.fertilizerIndents = false;
    this.insecticesIndents = false;
    this.machineryIndents = false;
    this.seedsIndents = false;

    if(tab == 'Fertilizer'){
      this.fertilizerIndents = true;
    }else if(tab == 'Insectices'){
      this.insecticesIndents = true;
    }else if(tab == 'Machinery'){
      this.machineryIndents = true;
    }else if(tab == 'Seeds'){
      this.seedsIndents = true;
    }
  }
  
  save()
  {
    this._productService.updateEnquiry(this.indentForm.value,this.currentItem.id).subscribe(data=>{
    this.modalService.dismissAll();
     this.getIdent();
  // this.ngOnInit();
    })
  }

  selectIndentFertiliser(id,status){
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>datadata', data);
    this.supplierService.selectIndentFertilizer(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>',response);
      this.toastr.success('Indent Successfully Updated');
      this.getIndentDetailsForSupplier();

    },
      err => {
        console.log(err)
      }
    );

  }

  selectIndentMachinery(id,status){
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.selectIndentMachinery(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>',response);
      this.toastr.success('Indent Successfully Updated');
      this.getIndentDetailsForSupplier();

    },
      err => {
        console.log(err)
      }
    );

  }

  selectIndentInsecticide(id,status){
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.selectIndentInsecticides(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>',response);
      this.toastr.success('Indent Successfully Updated');
      this.getIndentDetailsForSupplier();
    },
      err => {
        console.log(err)
      }
    );

  }

  selectIndentSeeds(id,status){
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.selectIndentSeed(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>',response);
      this.toastr.success('Indent Successfully Updated');
      this.getIndentDetailsForSupplier();
    },
      err => {
        console.log(err)
      }
    );

  }

  selectIndentChc(id, status){
    let data = {
      "enqId": id,
      "status": status
    };
    console.log('>>data', data);
    this.supplierService.actionIndentChc(data).subscribe(response => {
      console.log('getIndentDetailsForSupplier>>>>>',response);
      this.toastr.success('Indent Successfully Updated');
     this.getIndentDetailsForChc();
    },
      err => {
        console.log(err)
      }
    );
  }

}

