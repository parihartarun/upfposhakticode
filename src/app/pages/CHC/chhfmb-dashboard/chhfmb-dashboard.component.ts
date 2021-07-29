import { Component, OnInit } from '@angular/core';
import { ChcFmbService } from 'src/app/_services/chc_fmb/chc-fmb.service';
import { CommonService } from 'src/app/_services/common/common.service';

@Component({
  selector: 'app-chhfmb-dashboard',
  templateUrl: './chhfmb-dashboard.component.html',
  styleUrls: ['./chhfmb-dashboard.component.css']
})
export class ChhfmbDashboardComponent implements OnInit {

 
  public Fertilizer = true;
  public Insectices = false;
  public fertilizerIndents = true;
  public insecticesIndents = false;
  public machineryIndents = false;
  public seedsIndents = false;
  p:number = 1;

  chartOption:any;
  seeds:Array<any>=[];
  Machineries:Array<any>=[];
  fertilizers:Array<any>=[];
  insectices:Array<any>=[];
  finYears:[];

  machineryIndent:Array<any>=[];

  // Graph
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity';

  goBackUrl = '';
  colorScheme = {
    domain: ['blue']
  };
  
  constructor(private api:ChcFmbService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getDashboardDetails();
   // this.getIndentDetails();
  }

  getIndentDetails(){
    this.api.getIndentDetails(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.machineryIndent = response.machineryIndent;
    },
      err => {
        console.log(err)
      }
    );
  }

  getDashboardDetails() {
    this.api.getDashboardData(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.setMachinariesData(response.machineryBarChart);
    },
      err => {
        console.log(err)
      }
    );
  }

  setMachinariesData(mdata){
    console.log(mdata);
    var data= [];
    if(mdata.length > 0){
      for(let i=0;i<mdata.length;i++){
          var ob = {};
          ob['name'] = mdata[i].machinerytName;
          ob['series'] = [
            {
              "name": "Machinery",
              "value": mdata[i].machineryQty
            }
          ];
          data.push(ob);
      }
    }

    this.Machineries = [
      {
        title: `Total Machinaries`,
        data: data
      }
    ];
  }

  showGraphs(tab){
    this.Fertilizer = false;
    this.Insectices = false;
    if(tab == 'Fertilizer'){
      this.Fertilizer = true;
    }else if(tab == 'Insectices'){
      this.Insectices = true;
    }
  }

}
