import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';

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
  salesProduction:Array<any>=[];
  finYears:[];

  markatableProductionRabi:Array<any>=[];
  markatableProductionKharif:Array<any>=[];
  markatableProductionZayad:Array<any>=[];

  actualProductionRabi:Array<any>=[];
  actualProductionKharif:Array<any>=[];
  actualProductionZayad:Array<any>=[];

  salesProductionRabi:Array<any>=[];
  salesProductionKharif:Array<any>=[];
  salesProductionZayad:Array<any>=[];
  
  public totals = {
    totalFpoFarmer: 0,
    totalMarginalFarmer: 0,
    totalSmallFarmer: 0,
    totalOtherFarmer: 0,
    landArea: 0,
    crops:0
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
  goBackUrl = '';
  colorScheme = {
    domain: ['blue', '#ca1a1a']
  };
  colorScheme1 = {
    domain: ['#a29974', '#ca1a1a', '#f9b605', '#0e6655']
  };


  constructor(private api: FpoService, private common:CommonService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getFinancialYears();
    this.getDashboardDetails('2020-2021');
  }

  getFinancialYears(){
    this.common.getFinancialYears().subscribe(response => {
      console.log(response);
      this.finYears = response;
    },
      err => {
        console.log(err)
      }
    );
  }


  getDashboardDetails(finYear) {
    this.api.getDashboardData({fpoId:localStorage.getItem('masterId'), finYear: finYear}).subscribe(response => {
      console.log("FPO", response);
      this.totals = response;
      this.actualProduction = response.fpoActualQty;
      this.setMarkatableProduction(response.fpoMarketableProduction);
      this.setActualProduction(response.fpoActualProduction);
      this.setSalesProduction(response.fpoTotSoldProduction);
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
    this.markatableProductionRabi = rabiData;
    this.markatableProductionKharif = kharifData;
    this.markatableProductionZayad = zayadData;

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
          ob['value'] = td[i].totAcProd;
          rabiData1.push(ob);
      }
    }

    if(data['fpoActProdKharif'].length > 0){
      var td = data['fpoActProdKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totAcProd;
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
    
    this.actualProductionRabi = rabiData1;
    this.actualProductionKharif = kharifData1;
    this.actualProductionZayad = zayadData1;
  }

  setSalesProduction(data){
    console.log(data);
    var rabiData2 = [];
    var kharifData2 = [];
    var zayadData2 = [];
    if(data['fpoTotSoldRabi'].length > 0){
      var td = data['fpoTotSoldRabi'];
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          rabiData2.push(ob);
      }
    }

    if(data['fpoTotSoldKharif'].length > 0){
      var td = data['fpoTotSoldKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          kharifData2.push(ob);
      }
    }

    if(data['fpoTotSoldZayad'].length > 0){
      var td = data['fpoTotSoldZayad'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          zayadData2.push(ob);
      }
    }

    this.salesProductionRabi = rabiData2;
    this.salesProductionKharif = kharifData2;
    this.salesProductionZayad = zayadData2;
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
