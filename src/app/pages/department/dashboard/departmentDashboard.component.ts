import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './departmentDashboard.component.html',
  styleUrls: ['./departmentDashboard.component.scss']
})
export class DepartmentDashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public prod = false;
  public surp = true;

  // Graph

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  // gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Crops';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity (in Qt.)';
  multi = [];
  multi1 = [];
  multi2 = [];
  multi3 = []
  goBackUrl = '';
  colorScheme = {
    domain: ['blue', '#ca1a1a']
  };
  colorScheme1 = {
    domain: ['#a29974', '#ca1a1a', '#f9b605', '#0e6655']
  };

// Doughnut
public doughnutChartLabels = [
  "Download Sales",
  "In-Store Sales",
  "Mail-Order Sales"
];
public doughnutChartData = [[350, 450, 100]];
public doughnutChartType = "doughnut";

  ngOnInit() {

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

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
    });
    
    this.setGraphData();
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
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
                "value": 4000
              },
              {
                "name": "Sold",
                "value": 2000
              }
            ]
          },

          {
            "name": "Flax Seed",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 150
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Chilli",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 912
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Brinjal",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 100
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Peas & Beans",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 100
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          },

          {
            "name": "Cauliflower",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 120
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
                "value": 100
              }
            ]
          },
        ]
      },
      {
        graphFor: `Total Marketable Surplus and Sold Quantity with FPO for Kharif season (in Qt.)`,
        graphDetails: [
          {
            "name": "Paddy",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 3500
              },
              {
                "name": "Sold",
                "value": 850
              }
            ]
          },

          {
            "name": "Soyabean",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 5400
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
          },

          {
            "name": "Bottle Gourd",
            "series": [
              {
                "name": "Marketable Surplus",
                "value": 1900
              },
              {
                "name": "Sold",
                "value": 0
              }
            ]
          }, 
        ]
      }
    ]
  }

  productionGraph() {

    this.multi1 = [
      {
        graphFor: `Total Actual Production in Rabi (in Qt.)`,
        graphDetails: [
          {
            "name": "Gram",
            "series": [
              {
                "name": "Gram",
                "value": 3500
              }
            ]
          },

          {
            "name": "Lentil",
            "series": [
              {
                "name": "Lentil",
                "value": 1000
              }
            ]
          },

          {
            "name": "Wheat",
            "series": [
              {
                "name": "Wheat",
                "value": 4000
              }
            ]
          },
          {
            "name": "chilli",
            "series": [
              {
                "name": "chilli",
                "value": 1000
              }
            ]
          }
        ]
      }
    ],
      this.multi2 = [
        {
          graphFor: `Total Actual Production in Zayad (in Qt.)`,
          graphDetails: [
            {
              "name": "moong",
              "series": [
                {
                  "name": "moong",
                  "value": 3500
                }
              ]
            }
          ]
            }
      ],
          this.multi3 = [
            {
              graphFor: `Total Actual Production in Kharif (in Qt.)`,
              graphDetails: [
                {
                  "name": "paddy",
                  "series": [
                    {
                      "name": "paddy",
                      "value": 2000
                    }
                  ]
                },
                {
                  "name": "Soyabean",
                  "series": [
                    {
                      "name": "Soyaean",
                      "value": 3500
                    }
                  ]
                }
              ],
            }]
  }


  SurplusMarket() {
console.log("SurplusMarket");
this.setGraphData();
this.surp = true;
this.prod = false;
  }

productionActual() {
console.log("productionActual");
this.productionGraph();
this.prod = true;
this.surp = false;
}

}
