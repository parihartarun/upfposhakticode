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

  fertilizerIndent:Array<any>=[];
  insecticideIndent:Array<any>=[];
  machineryIndent:Array<any>=[];
  seedIndent:Array<any>=[];

  // Graph
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity (in Qt.)';

  goBackUrl = '';
  colorScheme = {
    domain: ['blue']
  };

  constructor(
    private supplierService:InputSupplierService,
    private common:CommonService) { 
  }

  ngOnInit(): void {
    this.chartOption = 'surplus';
    this.getDashboardDetails();
    //this.getIndentDetails();
  }

  getIndentDetails(){
    this.supplierService.getIndentDetails(localStorage.getItem('masterId')).subscribe(response => {
      console.log(response);
      this.fertilizerIndent = response.fertilizerIndent;
      this.insecticideIndent = response.insecticideIndent;
      this.machineryIndent = response.machineryIndent;
      this.seedIndent = response.seedIndent;
    },
      err => {
        console.log(err)
      }
    );
  }

  getDashboardDetails() {
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
          ob['name'] = sdata[i].cropName+' - '+sdata[i].varietyName;
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
    console.log(sdata);
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
    console.log(sdata);
    var data= [];
    if(sdata.length > 0){
      for(let i=0;i<sdata.length;i++){
          var ob = {};
          ob['name'] = sdata[i].insecticideType;
          ob['series'] = [
            {
              "name": "Insectices Pesticides",
              "value": sdata[i].quantity
            }
          ];
          data.push(ob);
      }
    }

    this.insectices = [
      {
        title: `Insectices Pesticides`,
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

  showIndents(tab){
    this.fertilizerIndents = false;
    this.insecticesIndents = false;
    this.machineryIndents = false;
    this.seedsIndents = false;

    if(tab == 'Fertilizer'){
      this.fertilizerIndents = true;
    }else if(tab == 'Insectices'){
      this.insecticesIndents = true;
    }else if(tab == 'Machinery'){
      this.machineryIndents = true;
    }else if(tab == 'Seeds'){
      this.seedsIndents = true;
    }
  }
}
