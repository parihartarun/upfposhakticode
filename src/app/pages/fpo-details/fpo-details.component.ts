import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { chartExample1, chartExample2, chartOptions, parseOptions } from 'src/app/variables/charts';
import { FpoService } from '../../_services/fpo/fpo.service';
import Chart from 'chart.js';
@Component({
  selector: 'app-fpo-details',
  templateUrl: './fpo-details.component.html',
  styleUrls: ['./fpo-details.component.css']
})
export class FpoDetailsComponent implements OnInit {

  closeResult: string;
  fpo = {};
  p:number =0;
  License =[];
  boardMember:[];
  machinerary = [];
  data1 = [];
  dummyid = 15;  
  additionalservice = []


  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public totals={
    otherFarmers:0,
    farmers:0,
    marginalFarmers:0,
    smallFarmers:0,
    land:0,
  };
  constructor(private modalService: NgbModal, private api: FpoService, private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
   
    ///////////////////////Apis/////////////////////////
    
    this._activatedroute.paramMap.subscribe(params => {
      let fpoId = Number(params.get('id')); 
     
      this.api.getfpoDetialById(fpoId).subscribe(f => {
        this.fpo=f
      })  

      this.api.getById(fpoId).subscribe(response => {
        this.data1 = response;
      });

      this.api.getAdditionServiceById(fpoId).subscribe(response => {        
      //  alert("addiational"+JSON.stringify(response));
        this.additionalservice = response;       
      });

      this.api.getBoardMemberById(fpoId).subscribe(response => {         
              this.boardMember = response;   
//alert("boardMember"+JSON.stringify(this.boardMember));  
              
      });
      
    });

    this.machinerary = [
     
      {
        "srNo":"1",
      "nameOfEqu": "Tractor",
      "noOfEqu": "1"     
      
    },
    {
      "srNo":"2",
      "nameOfEqu": "Thresher",
      "noOfEqu": "4."  
    },
    {
      "srNo":"3",      
      "nameOfEqu": "Seed Drill",
      "noOfEqu": "1"  
    },
    {
      "srNo":"4",      
      "nameOfEqu": "Rotavator",
      "noOfEqu": "2"  
    },
    {
      "srNo":"5",      
      "nameOfEqu": "Plough",
      "noOfEqu": " 5"  
    }
    ]
    this.License = [
     
      {
      "srNo":"1",
      "licenseType": "Seed Dealership License",
      "licenseIssueBy": "District Agriculture Officer", 
      "licenseNumber": "459/45862",          
      "licenseDate": "2015-05-22T14:56:28.000Z",
      "licenseValidtill": "2021-05-22T14:56:28.000Z",
    },
    {
      "srNo":"2",
      "licenseType": "Seed Dealership License",
      "licenseIssueBy": "UP Beej Vikas Nigam.", 
      "licenseNumber": "UP49E0002080",          
      "licenseDate": "2015-05-22T14:56:28.000Z",
      "licenseValidtill": "2020-05-22T14:56:28.000Z", 
    },
    {
      "srNo":"3",
      "licenseType": "Udyog Aadhaar",
      "licenseIssueBy": "Ministry of MSME", 
      "licenseNumber": "UP49E0053333",          
      "licenseDate": "2016-05-22T14:56:28.000Z",
      "licenseValidtill": "2020-05-22T14:56:28.000Z", 
    },
    {
      "srNo":"4",
      "licenseType": "Dealership License",
      "licenseIssueBy": "UP Beej Vikas Nigam", 
      "licenseNumber": "459/45578",          
      "licenseDate": "2019-05-22T14:56:28.000Z",
      "licenseValidtill": "2021-05-22T14:56:28.000Z",
    },
    {
      "srNo":"5",
      "licenseType": "Aadhaar License ",
      "licenseIssueBy": "Ministry of MSMES", 
      "licenseNumber": "UP49E00034567",          
      "licenseDate": "2020205-22T14:56:28.000Z",
      "licenseValidtill": "2022-05-22T14:56:28.000Z",
    }
    ]
    // this.boardMember=[
     
    //   {
    //     "srNo":"1",
    //   "memberName": "Mr. Jagdeesh",
    //   "designation": "Director",     
    //   "email": "vikaspathfpo@gmail.com",
    //   "mobileNo": "8976543214",   
    // },
    // {
    //   "srNo":"2",
    //   "memberName": "Mr. Rakesh Sahu",
    //   "designation": "Director",      
    //   "email": "vikaspathfpo@gmail.com",
    //   "mobileNo": "9876543214",    
    // },
    // {
    //   "srNo":"3",
    //   "memberName": "Mrs. Abilasa",
    //   "designation": "Director",     
    //   "email": "vikaspathfpo@gmail.com",
    //   "mobileNo": "8976543214",   
    // },
    // {
    //   "srNo":"4",
    //   "memberName": "Mr. Rajesh",
    //   "designation": "Director",     
    //   "email": "swatantra02@gmail.com",
    //   "mobileNo": "8076543214",   
    // },
    // {
    //   "srNo":"5",
    //   "memberName": "Dr. Swatantra K. Richhariya",
    //   "designation": "Chairman and Managing Director",     
    //   "email": "vikaspathfpo@gmail.com",
    //   "mobileNo": "9076543214",    
    // }
    // ]

     this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
   
  }

  getDashboardDetails(){
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
}
