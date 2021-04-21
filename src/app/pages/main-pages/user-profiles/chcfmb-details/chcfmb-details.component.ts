import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChcFmbService } from '../../../../_services/chc_fmb/chc-fmb.service';
import { Location } from '@angular/common';
import { AppConfig  } from '../../../../app.config';

@Component({
  selector: 'app-chcfmb-details',
  templateUrl: './chcfmb-details.component.html',
  styleUrls: ['./chcfmb-details.component.css']
})
export class ChcfmbDetailsComponent implements OnInit {

  user_id:number;
  user_data:any;
  machinaries:any;
  currentPage = 1;
  machinery_data: any;
  user_obj_length: number;
  machinery_object_length: number;

  constructor(private api:ChcFmbService, 
    private _activatedroute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(param => {
      this.user_id = param.id;
      this.getUserDetails();
      this.getMachinaries();
    });
  }

  getUserDetails(){
    this.api.getUserDetails(this.user_id).subscribe(response => {
     this.user_data = response.chcFmb;
     this.user_obj_length = Object.keys(this.user_data).length;
    })
  }

  getMachinaries() {
    this.api.getMachinaries(AppConfig.ROLE_CHCFMB, this.user_id).subscribe(response => {
      console.log(response);
      this.machinery_data = response;
      this.machinery_object_length = Object.keys(this.machinery_data).length;
     })
  }

  goBack(){
    this.location.back();
  }

}
