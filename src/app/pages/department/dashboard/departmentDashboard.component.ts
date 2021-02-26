import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';

// import Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './departmentDashboard.component.html',
  styleUrls: ['./departmentDashboard.component.scss']
})
export class DepartmentDashboardComponent implements OnInit {
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

  productions:[];
  districts:[];

  // Doughnut
  public doughnutChartLabels = [
    "NABARD",
    "SFAC",
    "UPBSN", 
    "UP State Bio-Energy Development Board"
  ];
  //public doughnutChartData = [];
  public doughnutChartData = [[25, 15, 10, 5]];

  public doughnutChartType = "doughnut";


  constructor(private api: FpoService) { 
  }

  ngOnInit() {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.api.getDepartmentDashboardData().subscribe(response => {
      console.log(response);
      this.totals = response;
      this.actualProduction = response.fpoActualQty;
      this.setMarkatableProduction(response.deptMarketableProduction);
      this.setActualProduction(response.deptActualProduction);
      this.setAgencyChartData(response.deptFpoAgency);
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
    if(data['deptTotMarRabi'].length > 0){
      var td = data['deptTotMarRabi'];
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

    if(data['deptTotMarKharif'].length > 0){
      var td = data['deptTotMarKharif'];
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

    if(data['deptTotMarZayad'].length > 0){
      var td = data['deptTotMarZayad'];
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
    if(data['deptActProdRabi'].length > 0){
      var td = data['deptActProdRabi'];
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = td[i].totAcProd;
          rabiData1.push(ob);
      }
    }

    if(data['deptActProdKharif'].length > 0){
      var td = data['deptActProdKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = td[i].totAcProd;
          kharifData1.push(ob);
      }
    }

    if(data['deptActProdZayad'].length > 0){
      var td = data['deptActProdZayad'];
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

  setAgencyChartData(data){
    let chartData = [];
    for (let i = 0; i < this.doughnutChartLabels.length; i++) {
      chartData[i] = 0;
      for (let j = 0; j < data.length; j++) {
        if (this.doughnutChartLabels[i] == data[j].agency) {
          chartData[i] = data[j].count;
          break;
        }
      }
    }
    console.log(chartData);
    this.doughnutChartData= [chartData];
    console.log(this.doughnutChartData);
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
