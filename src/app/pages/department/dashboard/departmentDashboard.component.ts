import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './departmentDashboard.component.html',
  styleUrls: ['./departmentDashboard.component.scss']
})
export class DepartmentDashboardComponent implements OnInit {

  public prod = false;
  public surp = true;

  // Graph

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
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

  productions:[];
  districts:[];

  // Doughnut
  public doughnutChartLabels = [
    "NABARD",
    "SFAC",
    "UPBSN", "UP State Bio-Energy Development Board"
  ];
  public doughnutChartData = [[250, 150, 100, 20]];
  public doughnutChartType = "doughnut";

  ngOnInit() {
    this.setGraphData();
    this.productionGraph();

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
            "value": 3500
          },

          {
            "name": "Lentil",
            "value": 1000
          },

          {
            "name": "Wheat",
            "value": 4000
          },
          {
            "name": "chilli",
            "value": 1000
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
              "value": 3500
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
              "value": 2000
            },
            {
              "name": "Soyaean",
              "value": 3500
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
    this.prod = true;
    this.surp = false;
  }

  selectCrops() {

  }

}
