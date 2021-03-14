import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { ToastrService } from 'ngx-toastr';
import { FarmerService } from 'src/app/_services/farmer/farmer.service';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  public markatable_surplus = true;
  public actual_production = false;
  
  chartOption:any;
  actualProduction:Array<any>=[];
  expectedProduction:Array<any>=[];
  salesProduction:Array<any>=[];

  public totals = {
    crops: 0,
    landArea: 0,
    cultivatedLand: 0,
    uncultivatedLand: 0
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

  notifications = [];
  p: number = 1;
  isViewComplaint = false;
  notification: any
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


  constructor(private api: FpoService, 
    private common:CommonService,
    private toastr: ToastrService, 
    private _farmerService: FarmerService) { 
  }

  ngOnInit() {
    this.getFinancialYears();
    this.getDashboardDetails('2020-2021');
    this.getNotifications();
  }

  getNotifications(){
    this._farmerService.getUnreadNotificationsByFarmer(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.notifications = response;
    })
  }

  viewNotifications(notification) {
    this._farmerService.viewNotifications(notification.id).subscribe(response => {
      console.log(response);
      this.getNotifications();
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
    this.api.getFarmerDashboardData(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.totals = response;
      this.actualProduction = response.fpoActualQty;
      this.setExpectedProduction(response.expectedYeildRabi, response.expectedYeildZayad, response.expectedYeildKhrif);
      this.setActualProduction(response.actualYeildRabi, response.actualYeildZayad, response.actualYeildKharif);
    },
      err => {
        console.log(err)
      }
    );
  }

  setExpectedProduction(rabiDataArr, zayadDataArr, kharifDataArr){
    var rabiData= [];
    var kharifData= [];
    var zayadData= [];
    if(rabiDataArr.length > 0){
      var td = rabiDataArr;
      console.log(td[0]);
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Expected Production",
              "value": td[i].production
            }
          ];
          rabiData.push(ob);
      }
    }

    if(zayadDataArr.length > 0){
      var td = zayadDataArr;
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Expected Production",
              "value": td[i].production
            }
          ];
          zayadData.push(ob);
      }
    }

    if(kharifDataArr.length > 0){
      var td = kharifDataArr;
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['series'] = [
            {
              "name": "Expected Production",
              "value": td[i].production
            }
          ];
          zayadData.push(ob);
      }
    }
    this.expectedProduction = [
      {
        title: `Total Expected Production in Rabi season (in Qt.)`,
        data: rabiData
      },
      {
        title: `Total Expected Production in Zayad season (in Qt.)`,
        data: kharifData
      },
      {
        title: `Total Expected Production in Kharif season (in Qt.)`,
        data:zayadData
      }
    ];
  }

  setActualProduction(rabiDataArr1, zayadDataArr1, kharifDataArr1){
    console.log(rabiDataArr1, zayadDataArr1, kharifDataArr1)
    var rabiData1 = [];
    var kharifData1 = [];
    var zayadData1 = [];
    if(rabiDataArr1.length > 0){
      var td = rabiDataArr1;
      console.log(td);
      for(let i=0;i<td.length;i++){
        console.log(td);
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].production;
          rabiData1.push(ob);
      }
    }

    if(zayadDataArr1.length > 0){
      var td = zayadDataArr1;
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].production;
          zayadData1.push(ob);
      }
    }

    if(kharifDataArr1.length > 0){
      var td = kharifDataArr1;
      for(let i=0;i<td.length;i++){
          var ob = {};
          ob['name'] = td[i].cropName;
          ob['value'] = td[i].production;
          kharifData1.push(ob);
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
    if(tab == 'markatable_surplus'){
      this.markatable_surplus = true;
    }else if(tab == 'actual_production'){
      this.actual_production = true;
    }
  }

}
