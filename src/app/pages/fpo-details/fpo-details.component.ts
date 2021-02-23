import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GetTranslationService } from 'src/app/_helpers/get-translation.service';
import { FpoService } from '../../_services/fpo/fpo.service';
@Component({
  selector: 'app-fpo-details',
  templateUrl: './fpo-details.component.html',
  styleUrls: ['./fpo-details.component.css']
})
export class FpoDetailsComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  closeResult: string;
  fpo: any = {};
  p: number = 0;
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
    otherFarmers: 0,
    farmers: 0,
    marginalFarmers: 0,
    smallFarmers: 0,
    land: 0,
  };
  fpoId;
  view: any[] = [400, 400];
  options = {};

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Crops';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity (in Qt.)';
  multi = [];
  goBackUrl = '';
  colorScheme = {
    domain: ['blue', '#ca1a1a']
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
    private api: FpoService, private _activatedroute: ActivatedRoute) { }

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
    this.setGraphData();
    this.goBackUrl = localStorage.getItem('fpoSearchUrl');

    this._activatedroute.paramMap.subscribe(params => {
      let fpoId = Number(params.get('id'));

      this.api.getfpoDetialById(fpoId).subscribe((res: any) => {
        if (res) {
          this.fpo = res;
        }
      });

      this.api.getById(fpoId).subscribe(response => {
        this.data1 = response;
      });
    });

    this.getFpoPhohto();
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
      if (res) {
        this.machinerary = res;
      }
    });
  }
  getDashboardDetails() {
    this.api.getDashboardData().subscribe(response => {
      console.log(response);
      this.totals = response;
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

    // this.graphdetailsrabi = res

  }



  setGraphData() {
    let graphdetailsrabi = [];
    let graphdetailszayad = [];
    let graphdetailskhalif = [];


    console.log(this.fpoId, "id");

    this.api.getverticalgraph(this.fpoId).subscribe((res) => {
      console.log(res, "graphalldata")

      res.forEach(element => {

        if (element.season_name == "Rabi") {
          let obj = {
            name: element.crop_name,
            series: []
          }
          obj.series = [
            {
              name: element.crop_name,
              value: element.total_markatable
            }
          ]
          graphdetailsrabi.push(obj);

        }
        else if (element.season_name == "Zayad") {
          let obj = {
            name: element.crop_name,
            series: []
          }
          obj.series = [
            {
              name: element.crop_name,
              value: element.total_markatable
            }
          ]
          graphdetailszayad.push(obj);
        }

        else if (element.season_name == "Kharif") {
          let obj = {
            name: element.crop_name,
            series: []
          }
          obj.series = [
            {
              name: element.crop_name,
              value: element.total_markatable
            }
          ]
          graphdetailskhalif.push(obj);
          console.log(graphdetailskhalif, "Kharif")
        }
      });



      this.multi = [
        {

          graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Rabi season (in Qt.)`,
          graphDetails: graphdetailsrabi
        },
        {
          graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Zayad season (in Qt.)`,
          graphDetails: graphdetailszayad
        },
        {
          graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Kharif season (in Qt.)`,
          graphDetails: graphdetailskhalif
        }
      ]

    });

  }


}
