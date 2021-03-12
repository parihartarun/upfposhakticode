import { Component, OnInit } from '@angular/core';
import { InputSupplierService } from 'src/app/_services/InputSupplier/InputSupplier.services';
import { CommonService } from 'src/app/_services/common/common.service';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.css']
})
export class SupplierDashboardComponent implements OnInit {

 
  public Fertilizer = true;
  public Insectices = false;
  
  chartOption:any;
  seeds:Array<any>=[];
  Machineries:Array<any>=[];
  fertilizers:Array<any>=[];
  insectices:Array<any>=[];
  finYears:[];

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

  constructor(
    private supplierService:InputSupplierService,
    private common:CommonService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getFinancialYears();
    this.getDashboardDetails('2021-2020');
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
    this.supplierService.getDashboardData(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.setMachinariesData(response.machineryBarChart);
      this.setSeedsData(response.seedsBarChart);
      this.setFertilizerData(response.fertilizerBarChart);
      this.setInsecticesData(response.insecticidesBarChart);
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
              "name": "Machinaries",
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

  setSeedsData(sdata){
    var data= [];
    if(sdata.length > 0){
      for(let i=0;i<sdata.length;i++){
          var ob = {};
          ob['name'] = sdata[i].cropName+'-'+sdata[i].varietyName;
          ob['series'] = [
            {
              "name": "Seeds",
              "value": sdata[i].seedQuantity
            }
          ];
          data.push(ob);
      }
    }

    this.seeds = [
      {
        title: `Total Seeds`,
        data: data
      }
    ];
  }

  setFertilizerData(sdata){
    var data= [];
    if(sdata.length > 0){
      for(let i=0;i<sdata.length;i++){
          var ob = {};
          ob['name'] = sdata[i].fertilizerName;
          ob['series'] = [
            {
              "name": "Fertilizer",
              "value": sdata[i].fertilizerQty
            }
          ];
          data.push(ob);
      }
    }

    this.fertilizers = [
      {
        title: `Fertilizer`,
        data: data
      }
    ];
  }

  setInsecticesData(sdata){
    var data= [];
    if(sdata.length > 0){
      for(let i=0;i<sdata.length;i++){
          var ob = {};
          ob['name'] = sdata[i].insecticideType;
          ob['series'] = [
            {
              "name": "Insectices/Pesticides",
              "value": sdata[i].quantity
            }
          ];
          data.push(ob);
      }
    }

    this.insectices = [
      {
        title: `Insectices/Pesticides`,
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
