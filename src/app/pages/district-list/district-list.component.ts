import { Component, OnInit } from '@angular/core';
import { FpoSearchService } from '../../_services/fpo/fpo-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {
  data:any ={};
  columns:any ={};
  columns2:any ={};
  columns3:any={}
  options:any ={};
  model:any={};
  distParams ={
    in:'',
    val:''
  }
  
  districtListObserver = this.fpoSearch.districtListObserver.asObservable();

  constructor(private fpoSearch:FpoSearchService,private _activatedroute:ActivatedRoute) {
     this.model.prop = 'A';
   }

   

  ngOnInit(): void {
    this._activatedroute.params.subscribe((param)=>{
        console.log('PARAMS ==>',param);
        this.distParams.in = param.searchType;
        this.distParams.val = param.val; 
        this.fpoSearch.getDistrictInfo(this.distParams.val,this.distParams.in)
    });

    

    this.districtListObserver.subscribe(dat =>{
      this.data = dat;
      console.log("THE DATA",this.data);
    });

    // FPO Details
    this.columns =[
      {key:'districtName',title:"District1"},
      {key:'fpoName',title:'FPO Name'},
      {key:'fpoEmail',title:'FPO Email'},
      {key:'fpoLandline',title:'Mobile'},
      {key:'crops',title:'Crops' },
      {key:'additionalServices',title:'Additional Services'}
    ];

    //Input Supplier Details 
    this.columns2 =[
      {key:'districtName',title:"District1"},
      {key:'input_supplier_name',title:'Input Supplier'},
      {key:'email',title:'Email'},
      {key:'mobile_number',title:'Mobile'},
      {key:'cropSeeds',title:'Seeds'},
      {key:'fertilizers',title:'Fertilizers'},
      {key:'insecticides',title:'Insecticides'},
      {key:'machineries',title:'Machinaries'}
    ];

    // CHC FMB Details  
    this.columns3 =[
      {key:'district_name',title:"District1"},
      {key:'chc_fmb_name',title:"CHC/FMB"},
      {key:'email',title:"Email"},
      {key:'mobile_number',title:"Mobile"},
      {key:'machineries',title:"Machinary"},
    ];
  }



}
