import { Component, OnInit } from '@angular/core';
import { FpoService } from 'src/app/_services/fpo/fpo.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { BuyerSellerService } from 'src/app/_services/BuyerSeller/buyerseller.services';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent implements OnInit {

  public cancelled = true;
  public active = false;
  public fulfilled = false;

  chartOption:any;
  cropIndents:Array<any>=[];
  totalIndents:Array<any>=[];
  finYears:[];

  public totals = {
    fpos: 0,
    activeIndents: 0,
    fulfilledIndents: 0,
    cancelIndents: 0
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


  constructor(
    private api: FpoService, 
    private common:CommonService,
    private buyerService:BuyerSellerService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getFinancialYears();
    this.getDashboardDetails();
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


  getDashboardDetails() {
    this.buyerService.getDashboardData(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.totals = response;
      this.setCropIndents(response.buyerSellerCropIndent);
      this.setIndentGraphData(response.activeIndents, response.fulfilledIndents, response.cancelIndents);
    },
      err => {
        console.log(err)
      }
    );
  }

  setIndentGraphData(active, fulfilled, cancelled){
    var data = [];
    var ob1 = {};
    var ob2 = {};
    var ob3 = {};
    ob1['name'] = "Active Indents";
    ob1['series'] = [
      {
        "name": "Indents",
        "value": active
      }
    ];
    ob2['name'] = "Fullfilled Indents";
    ob2['series'] = [
      {
        "name": "Indents",
        "value": fulfilled
      }
    ];
    ob3['name'] = "Cancelled Indents";
    ob3['series'] = [
      {
        "name": "Indents",
        "value": cancelled
      }
    ];

    data.push(ob1);
    data.push(ob2);
    data.push(ob3);

    this.totalIndents = [
      {
        title: `Total Number of Indents`,
        data: data
      }
    ];
  }

  setCropIndents(sdata){
    console.log(sdata);
    var data = [];
    if(sdata.length > 0){
      for(let i=0;i<sdata.length;i++){
        var ob = {};
        ob['name'] = sdata[i].cropName;
        ob['series'] = [
          {
            "name": "Crops",
            "value": sdata[i].indentQty
          }
        ];
        data.push(ob);
      }
    }
    console.log(data);
    this.cropIndents = [
      {
        title: `Total Number of Indents by crop`,
        data: data
      }
    ];
  }

}
