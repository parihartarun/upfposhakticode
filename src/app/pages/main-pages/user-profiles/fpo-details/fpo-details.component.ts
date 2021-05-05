import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GetTranslationService } from 'src/app/_helpers/get-translation.service';
import { FpoService } from '../../../../_services/fpo/fpo.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/_services/common/common.service';

@Component({
  selector: 'app-fpo-details',
  templateUrl: './fpo-details.component.html',
  styleUrls: ['./fpo-details.component.css']
})
export class FpoDetailsComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  closeResult: string;
  fpo: any = {};
  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  t: number = 1;
  searchText1 = '';
  searchText2 = '';
  searchText3 = '';
  searchText4 = '';
  searchText5 = '';

  License = [];
  boardMember: [];
  machinerary = [];
  coldStorage = [];
  data1 = [];
  dummyid = 15;
  additionalservice = []
  boardMemberPagination = 1;
  mechPagination = 1;
  coldPagination = 1;
  storageUnitPagination = 1;
  productPagination = 1;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public totals = {
    totalFpoFarmer: 0,
    landArea: 0
  };
  fpoId;
  view: any[] = [400, 400];
  options = {};
  orderBy:{order:string,key:string} ={order:'',key:''};

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

  pfoPhoto = [];
  boardMemCol: any = [];
  storageUnitCol = [];
  licenseColumn = [];
  machinaryBColumn = [];
  productiondata = []
  productionColumn = [];
  fpoColumn = [];
  graphdetailsrabi: any;
  constructor(private modalService: NgbModal,
    public getTranslationService: GetTranslationService,
    private api: FpoService, 
    private _activatedroute: ActivatedRoute, 
    private location: Location, 
    private common:CommonService) { }

  ngOnInit(): void {
    ///////////////////////Apis/////////////////////////
    this._activatedroute.params.subscribe(param => {
      this.fpoId = param.id;

      console.log(this.fpoId);
      this.getAllByFpo();
      this.getFarmMachineryBankByFpo();
      this.getproductetails();
    });
    this.setColumnHeader();
    this.goBackUrl = localStorage.getItem('fpoSearchUrl');

    this._activatedroute.paramMap.subscribe(params => {
      let fpoId = Number(params.get('id'));
console.log(this.fpoId,"Id");
      this.api.getfpoDetialById(fpoId).subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.fpo = res;
        }
      });

      this.api.getById(fpoId).subscribe(response => {
        this.data1 = response;
      });

      this.chartOption = 'surplus';
      this.getFinancialYears();
      this.getDashboardDetails('2020-2021');
    });

    this.getFpoPhohto();
  }

  onClickOrderBy( key:any ){
    this.orderBy={
      ...this.orderBy,
      'order': this.orderBy.order == 'asc' ? 'desc' : 'asc',
      'key': key
    }
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

  async setColumnHeader() {

    this.boardMemCol = [
      { key: 'name', title: 'Member Name' },
      { key: 'designation', title: 'Designations' },
      { key: 'email', title: 'Email' },
      { key: 'contactNo', title: 'Mobile' },
    ];
    this.storageUnitCol = [
      { key: 'district', title: 'District' },
      { key: 'address', title: 'Storage Center Address' },
      { key: 'storageType', title: 'Storage Center Type' },
      { key: 'storageCapacity', title: 'Storage Capacity (in Mt.)' },
      { key: 'fascilities', title: 'Available Facilities' }
    ];
    this.licenseColumn = [
      { key: 'licenceType', title: 'Licenses Type' },
      { key: 'licenceIssuedBy', title: 'Licenses Issued By' },
      { key: 'liceneceNumber', title: 'Licenses Number' },
      { key: 'issuedate', title: 'Licenses From' },
      { key: 'licenceValidTill', title: 'Licenses To' },
    ];
    this.machinaryBColumn = [
      { key: 'equpment_name', title: 'Name Of Equipment' },
      { key: 'equpment_no', title: 'No Of Equipment' },
    ];
    this.productionColumn = [
      { key: 'crop_name', title: 'Crops' },
      { key: 'season_name', title: 'Season' },
      { key: 'total_markatable', title: 'Marketable Surplus 2021 (In Qt.)' },
      { key: 'total_sold', title: 'SOLD QUANTITY 2021 (IN QT.)' },
    ];
    this.fpoColumn = [
      { key: 'fpoName', title: 'FPO Name' },
      { key: 'fpoEmail', title: 'Email' },
      { key: 'agency', title: 'Agency (associated with)' },
      { key: 'fpoAddress', title: 'Address' },


    ]
  }
  getFpoPhohto() {
    this.api.getFpoPhoto(this.fpoId).subscribe((res: any) => {
      if (res) {
        console.log('res', res);
        this.pfoPhoto = res;
      }
    })
  }
  getAllByFpo() {
    this.api.getAllStorageUnitByFpo(this.fpoId).subscribe((res: any) => {
      if (res) {
        this.coldStorage = res;
        console.log(this.coldStorage);
      }
    });
  }



  getFarmMachineryBankByFpo() {
    this.api.getFarmMachineryBankByFpo(this.fpoId).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.machinerary = res;
      }
    });
  }
  getDashboardDetails(finYear) {
    this.api.getDashboardData({fpoId:this.fpoId, finYear: finYear}).subscribe(response => {
      console.log(response);
      this.totals = response;
      this.setMarkatableProduction(response.fpoMarketableProduction);
      this.setActualProduction(response.fpoActualProduction);
      this.setSalesProduction(response.fpoTotSoldProduction);
    },
      err => {
        console.log(err)
      }
    );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getproductetails() {
    this.api.getproductiondetail(this.fpoId).subscribe((res) => {
      console.log(res, "productiondata")
      if (res) {
        this.productiondata = res;
      }
    })
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

  goBack(){
    this.location.back();
  }

}
