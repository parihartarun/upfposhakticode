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
  searchText1='';
  searchText2='';
  searchText3='';
  p: number = 1;
  q:number =1;
  r:number =1;
  orderBy:{order:string,key:string} ={order:'',key:''};
  
  districtListObserver = this.fpoSearch.districtListObserver.asObservable();

  constructor(private fpoSearch:FpoSearchService,private _activatedroute:ActivatedRoute,private route: Router) {}

   

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
    // this.columns =[
    //   {key:'districtName',title:"District1"},
    //   {key:'fpoName',title:'FPO Name'},
    //   {key:'fpoEmail',title:'FPO Email'},
    //   {key:'fpoLandline',title:'Mobile'},
    //   {key:'crops',title:'Crops',width:'auto',noWrap: { head: true, body: true } },
    //   {key:'additionalServices',title:'Additional Services',width:'auto',noWrap: { head: true, body: true }}
    // ];
 
  }

  
  onClickOrderBy( key:any ){
    this.orderBy={
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    }
  }

  routePage(page,id){
    this.route.navigate(['/'+page+'/' ,id]);
  }

}
