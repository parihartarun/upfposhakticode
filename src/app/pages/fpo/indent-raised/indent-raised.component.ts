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
  data2:any;
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
     
   if(this.userRole == 'ROLE_FPC'){
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
    console.log("FilterParams",this.filterParams);  
    if (this.userRole == 'ROLE_FPC' || this.userRole == 'ROLE_BUYERSELLER') { 
        this.fpoService.getIndentByUserId(this.filterParams.masterId, this.filterParams.roleId).subscribe(dummy =>{
          console.log(dummy);  
          this.data = dummy;
            this.indents =this.data;
            this.totCrops =this.data.length;
            this.loading =false;
        });
    }
    this.fpoService.getRaisedIndent(this.filterParams).subscribe(dummy=>{
        this.data2 = dummy;
        // this.indents = this.data;
         this.indents2 =this.data2.seedIndent;
         this.indents3 = this.data2.fertilizerIndent;
         this.indents4=this.data2.insecticideIndent;
         this.indents5 =this.data2.machineryIndent;
         this.selected="";
        // // Total values
        // this.totCrops =this.data.length;
         this.fertTot =this.data2.fertilizerIndent.length;
         this.seedTot = this.data2.seedIndent.length;
         this.insTot = this.data2.insecticideIndent.length;
         this.machTot =this.data2.machineryIndent.length;
         this.loading =false;
    });
  }

  showHiddenTable(elem){
    console.log("Triggered");
      this.showTable.val = elem;
  }

  onSelect(val){
    if(val === ""){
      if(this.userRole == 'ROLE_FPC'){
      this.indents =this.data;
      }
      if(this.userRole !== 'ROLE_CHCFMB'){  
          this.indents3 = this.data2.fertilizerIndent;
          this.indents2 =this.data2.seedIndent;
          this.indents4=this.data2.insecticideIndent;
      }
      this.indents5 =this.data2.machineryIndent;
    }else{
      if(this.userRole == 'ROLE_FPC'){
           this.indents = this.data.filter(dat => dat.status.toLowerCase() == val.toLowerCase() );
      }
      if(this.userRole !== 'ROLE_CHCFMB'){     
      this.indents3 = this.data2.fertilizerIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      this.indents2 = this.data2.seedIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      this.indents4 = this.data2.insecticideIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
      }
      this.indents5 =this.data2.machineryIndent.filter(dat => dat.status.toLowerCase() == val.toLowerCase());
    }
  }

  cancelIndent(indentId){
    this._buyerService.deleteIndent(indentId).subscribe(data=>{
      this.toastr.success('Successfully cancelled');
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
