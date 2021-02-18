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
  productionColumn = [];
  fpoColumn = [];
  constructor(private modalService: NgbModal,
    public getTranslationService: GetTranslationService,
    private api: FpoService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    ///////////////////////Apis/////////////////////////
    this._activatedroute.params.subscribe(param => {
      this.fpoId = param.id;
      this.getAllByFpo();
      this.getFarmMachineryBankByFpo();
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

      // this.api.getAdditionServiceById(fpoId).subscribe(response => {
      //   //  alert("addiational"+JSON.stringify(response));
      //   this.additionalservice = response;
      // });

      // this.api.getBoardMemberById(fpoId).subscribe(response => {
      //   this.boardMember = response;
      //   //alert("boardMember"+JSON.stringify(this.boardMember));  

      // });

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
      { key: 'a', title: 'Crops' },
      { key: 'b', title: 'Crop Variety' },
      { key: 'c', title: 'Marketable Surplus 2021 (In Qt.)' },
      { key: 'd', title: 'SOLD QUANTITY 2021 (IN QT.)' },
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
  setGraphData() {
    this.multi = [
      {
        graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Rabi season (in Qt.)`,
        graphDetails: [
          {
            "name": "Gram",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 3500
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Lentil",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 1000
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Wheat",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 7000
              },
              {
                "name": "Sold",
                "value": 3000
              }
            ]
          }
        ]
      },
      {
        graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Zayad season (in Qt.)`,
        graphDetails: [
          {
            "name": "Moong",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 950
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },
        ]
      },
      {
        graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Kharif season (in Qt.)`,
        graphDetails: [
          {
            "name": "Moong",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 450
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Soyabean",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 8400
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Urad",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 4300
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          }
        ]
      }
    ]
  }
}
