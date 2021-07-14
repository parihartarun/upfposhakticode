import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { HomeService } from '../../../_services/home/home.service';
import { DepartmentService } from '../../../_services/department/department.service';

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
  salesProduction:Array<any>=[];

  public totals = {
    totalFpo: 0,
    landArea: 0,
    totalfarmers: 0,
    totalMarginalFarmer: 0,
    totalSmallFarmer: 0,
    totalOtherFarmer: 0
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
    domain: ['blue']
  };

  productions:[];
  districts:[];
  finYears:[];
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

  farmerDetails: any;
  productionDetails: any;
  fpo: any;
  circluar: any;
  fmbs=0;
  coldStorages=0;
  seedProcessing=0;
  constructor(private api: FpoService, private deptService:DepartmentService, private common:CommonService, private homeService:HomeService) { 
  }

  ngOnInit() {
    this.getFinancialYears();
    this.getDashboardDetails('2020-2021');
    this.homeService.getfarmerDetails().subscribe(h => {
      this.farmerDetails = h
    })
    this.homeService.getProductionDetails().subscribe(p => {
      console.log(p);
      this.productionDetails = p
    })
    this.api.getAllFpo().subscribe(fpo => {
      this.fpo = fpo.length;
    })
    this.deptService.getAllCircluarUpload().subscribe(c => {
     // console.log(c);
      this.circluar = c
    })
    this.homeService.getChcFmbs().subscribe(res => {
      this.fmbs = res.fmbscount;
    })
    this.homeService.getColdStorages().subscribe(res => {
      this.coldStorages = res.coldstorage;
    })
    this.homeService.getSeedProcessingUnits().subscribe(res => {
      this.seedProcessing = res.seedprocessingunit
    })
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
    this.api.getDepartmentDashboardData({finYear: finYear}).subscribe(response => {
      console.log(response);
      this.totals = response;
      this.actualProduction = response.fpoActualQty;
      this.setMarkatableProduction(response.deptMarketableProduction);
      this.setActualProduction(response.deptActualProduction);
      this.setAgencyChartData(response.deptFpoAgency);
      this.setSalesProduction(response.deptSoldProduction);
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
          ob['value'] = td[i].totAcProd;
          rabiData1.push(ob);
      }
    }

    if(data['deptActProdKharif'].length > 0){
      var td = data['deptActProdKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totAcProd;
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
        title: `Total Actual Production in Rabi season (in Qt.)`,
        data: rabiData1
      },
      {
        title: `Total Actual Production in Zayad season (in Qt.)`,
        data: kharifData1
      },
      {
        title: `Total Actual Production in Kharif season (in Qt.)`,
        data:zayadData1
      }
    ];
  }

  setSalesProduction(data){
    console.log(data);
    var rabiData2 = [];
    var kharifData2 = [];
    var zayadData2 = [];
    if(data['deptTotSoldRabi'].length > 0){
      var td = data['deptTotSoldRabi'];
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          rabiData2.push(ob);
      }
    }

    if(data['deptTotSoldKharif'].length > 0){
      var td = data['deptTotSoldKharif'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          kharifData2.push(ob);
      }
    }

    if(data['deptTotSoldZayad'].length > 0){
      var td = data['deptTotSoldZayad'];
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].totSold;
          zayadData2.push(ob);
      }
    }
    
    this.salesProduction = [
      {
        title: `Total Sales in Rabi season (in Qt.)`,
        data: rabiData2
      },
      {
        title: `Total Sales in Zayad season (in Qt.)`,
        data: kharifData2
      },
      {
        title: `Total Sales in Kharif season (in Qt.)`,
        data:zayadData2
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
