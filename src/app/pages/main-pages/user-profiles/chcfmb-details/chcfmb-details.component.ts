import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChcFmbService } from '../../../../_services/chc_fmb/chc-fmb.service';

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

  constructor(private api:ChcFmbService, 
    private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(param => {
      this.user_id = param.id;
      console.log(this.user_id);
      this.getUserDetails();
      this.getMachinaries();
    });
  }

  getUserDetails(){
    this.api.getUserDetails(this.user_id).subscribe(response => {
      console.log(response);
      this.user_data = response;
    })
  }

  getMachinaries(){
    this.machinaries = this.api.getMachinaries(this.user_id);
  }

}
