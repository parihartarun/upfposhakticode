import { Component, OnInit } from '@angular/core';
import {FpoService} from  '../../../_services/fpo/fpo.service';
import { BuyerSellerService } from "src/app/_services/BuyerSeller/buyerseller.services";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-indent-raised',
  templateUrl: './indent-raised.component.html',
  styleUrls: ['./indent-raised.component.css']
})
export class IndentRaisedComponent implements OnInit {
  showTable:any = {};
  loading:boolean=false;
  data:any;
  indentsRaisedData:any;
  userRole:any;
  indents:any;
  indents2:any;
  indents3:any;
  indents4:any;
  indents5:any;
  totCrops:number;
  selected:any;
  fertTot:any;
  seedTot:any;
  insTot:any;
  machTot:any;
  p:number;
  filterParams={
    masterId:'',
    roleId:''
  }

  constructor( public fpoService:FpoService,
    private _buyerService: BuyerSellerService,
    private toastr: ToastrService) {
      this.userRole =localStorage.getItem('userRole');

   if(this.userRole == 'ROLE_FPC' || this.userRole == 'ROLE_BUYERSELLER'){
    this.showTable.val = 'A';
   } else if(this.userRole == 'ROLE_CHCFMB'){
      this.showTable.val = 'D';
    } else{
        this.showTable.val = 'B';
    } 
   
   }

  ngOnInit() {
    this.loading = true; 
    this.filterParams.masterId = localStorage.getItem('masterId');
    this.filterParams.roleId = localStorage.getItem('roleRefId');
    this.userRole =localStorage.getItem('userRole');
    this.getIndentsForCrops();
    this.getIndentsRaised();
  }

  getIndentsForCrops(){
    this.fpoService.getIndentByUserId(this.filterParams.masterId, this.filterParams.roleId).subscribe(dummy =>{
      console.log(dummy);  
      this.data = dummy;
        this.indents =this.data;
        this.totCrops =this.data.length;
        this.loading =false;
    });
  }

  getIndentsRaised(){
    this.fpoService.getRaisedIndent(this.filterParams).subscribe(res=>{
      this.indentsRaisedData = res;
       this.indents2 = res.seedIndent;
       this.indents3 = res.fertilizerIndent;
       this.indents4 = res.insecticideIndent;
       this.indents5 = res.machineryIndent;
       this.selected="";
       this.fertTot = res.fertilizerIndent.length;
       this.seedTot = res.seedIndent.length;
       this.insTot = res.insecticideIndent.length;
       this.machTot = res.machineryIndent.length;
       this.loading =false;
  });
  }

  showHiddenTable(elem){
      this.showTable.val = elem;
  }

  onSelect(val){
    if(val === ""){
      if(this.userRole == 'ROLE_FPC'){
      this.indents =this.data;
      }
      if(this.userRole !== 'ROLE_CHCFMB'){  
          this.indents3 = this.indentsRaisedData.fertilizerIndent;
          this.indents2 =this.indentsRaisedData.seedIndent;
          this.indents4=this.indentsRaisedData.insecticideIndent;
      }
      this.indents5 =this.indentsRaisedData.machineryIndent;
    }else{
      if(this.userRole == 'ROLE_FPC'){
           this.indents = this.data.filter(dat => dat.status.toLowerCase() == val.toLowerCase() );
      }
      if(this.userRole !== 'ROLE_CHCFMB'){     
      this.indents3 = this.indentsRaisedData.fertilizerIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      this.indents2 = this.indentsRaisedData.seedIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      this.indents4 = this.indentsRaisedData.insecticideIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
      this.indents5 =this.indentsRaisedData.machineryIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
    }
  }

  cancelIndent(indentId){
    if(confirm("Are you sure, you want to cancel this indent?")) {
      this._buyerService.deleteIndent(indentId).subscribe(data=>{
        this.toastr.success('Indent Raised Cancelled Successfully');
        this.fpoService.getIndentByUserId(this.filterParams.masterId, this.filterParams.roleId).subscribe(dummy =>{
          console.log(dummy);  
          this.data = dummy;
            this.indents =this.data;
            this.totCrops =this.data.length;
            this.loading =false;
        });
      })
    }
  }

  cancelFertilizerIndent(indentId){
    if(confirm("Are you sure, you want to cancel this indent?")) {
      this._buyerService.cancelFertilizerIndent(indentId).subscribe(data=>{
          this.toastr.success('Indent Raised Cancelled Successfully.');
          this.getIndentsRaised();
      })
    }
  }

  cancelSeedIndent(indentId){
    if(confirm("Are you sure, you want to cancel this indent?")) {
      this._buyerService.cancelSeedIndent(indentId).subscribe(data=>{
        this.toastr.success('Indent Raised Cancelled Successfully.');
        this.getIndentsRaised();
      })
    }
  }

  cancelInsecticidesIndent(indentId){
    if(confirm("Are you sure, you want to cancel this indent?")) {
      this._buyerService.cancelInsecticidesIndent(indentId).subscribe(data=>{
        this.toastr.success('Indent Raised Cancelled Successfully.');
        this.getIndentsRaised();
      })
    }
  }

  cancelMachineryIndent(indentId){
    if(confirm("Are you sure, you want to cancel this indent?")) {
      this._buyerService.cancelMachineryIndent(indentId).subscribe(data=>{
        this.toastr.success('Indent Raised Cancelled Successfully.');
        this.getIndentsRaised();
      })
    }
  }
}
