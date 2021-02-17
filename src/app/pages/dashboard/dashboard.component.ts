import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';
import { FpoService } from '../../_services/fpo/fpo.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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



  constructor(private api:FpoService){}

  ngOnInit() {

  
    this.getDashboardDetails();
   // this.getChartDetails();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
    // });
  }

  getDashboardDetails(){
    this.api.getDashboardData().subscribe(response => {
      console.log("FPO",response);
      this.totals = response;
    },
      err => {
        console.log(err)
      }
    );
  }

  // getChartDetails(){
  //   console.log(localStorage.getItem('masterId'));
  //   this.api.getChartDetails(localStorage.getItem('masterId')).subscribe(response => {
  //     console.log('ss'+response);
  //   },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  // }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
