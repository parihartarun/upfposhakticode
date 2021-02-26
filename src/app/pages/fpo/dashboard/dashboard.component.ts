import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class FpoDashboardComponent implements OnInit {

  public markatable_surplus = true;
  public actual_production = false;
  public sales_production = false;
  
  chartOption:any;
  actualProduction:Array<any>=[];
  markatableProduction:Array<any>=[];

  public totals = {
    otherFarmers: 0,
    farmers: 0,
    marginalFarmers: 0,
    smallFarmers: 0,
    land: 0,
  };

  // Graph

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Crops';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity (in Qt.)';
  multi = [];
  multi1 = [];
  multi2 = [];
  multi3 = []
  goBackUrl = '';
  colorScheme = {
    domain: ['blue', '#ca1a1a']
  };
  colorScheme1 = {
    domain: ['#a29974', '#ca1a1a', '#f9b605', '#0e6655']
  };


  constructor(private api: FpoService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    console.log(localStorage.getItem('masterId'));
    this.api.getDashboardData(localStorage.getItem('masterId')).subscribe(response => {
      console.log("FPO", response);
      this.totals = response;
      this.actualProduction = response.fpoActualQty;
      this.setMarkatableProduction(response.fpoMarketableProduction);
      this.setActualProduction(response.fpoActualProduction);
    },
      err => {
        console.log(err)
      }
    );
  }

  setMarkatableProduction(data){
    var rabiData= [];
    var kharifData= [];
    var zayadData= [];
    if(data['fpoTotMarRabi'].length > 0){
      var td = data['fpoTotMarRabi'];
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Marketable Surplus",
              "value": td[i].totMarkProd
            }
          ];
          rabiData.push(ob);
      }
    }

    if(data['fpoTotMarKharif'].length > 0){
      var td = data['fpoTotMarKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Marketable Surplus",
              "value": td[i].totMarkProd
            }
          ];
          kharifData.push(ob);
      }
    }

    if(data['fpoTotMarZayad'].length > 0){
      var td = data['fpoTotMarZayad'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Marketable Surplus",
              "value": td[i].totMarkProd
            }
          ];
          zayadData.push(ob);
      }
    }
    this.markatableProduction = [
      {
        title: `Total Marketable Surplus in Rabi season (in Qt.)`,
        data: rabiData
      },
      {
        title: `Total Marketable Surplus in Zayad season (in Qt.)`,
        data: kharifData
      },
      {
        title: `Total Marketable Surplus in Kharif season (in Qt.)`,
        data:zayadData
      }
    ];
  }

  setActualProduction(data){
    console.log(data);
    var rabiData1 = [];
    var kharifData1 = [];
    var zayadData1 = [];
    if(data['fpoActProdRabi'].length > 0){
      var td = data['fpoActProdRabi'];
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = td[i].totAcProd;
          rabiData1.push(ob);
      }
    }

    if(data['fpoActProdKharif'].length > 0){
      var td = data['fpoActProdKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = td[i].totAcProd;
          kharifData1.push(ob);
      }
    }

    if(data['fpoActProdZayad'].length > 0){
      var td = data['fpoActProdZayad'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totAcProd;
          zayadData1.push(ob);
      }
    }
    
    this.actualProduction = [
      {
        title: `Total Actual Production in Rabi (in Qt.)`,
        data: rabiData1
      },
      {
        title: `Total Actual Production in Zayad (in Qt.)`,
        data: kharifData1
      },
      {
        title: `Total Actual Production in Kharif (in Qt.)`,
        data:zayadData1
      }
    ];
  }

  showGraphs(tab){
    this.markatable_surplus = false;
    this.actual_production = false;
    this.sales_production = false;
    if(tab == 'markatable_surplus'){
      this.markatable_surplus = true;
    }else if(tab == 'actual_production'){
      this.actual_production = true;
    }else if(tab == 'sales_production'){
      this.sales_production = true;
    }
  }

}
