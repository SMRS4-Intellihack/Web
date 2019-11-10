import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartType } from "chart.js";
import { Color, Label, MultiDataSet } from "ng2-charts";
import { TensorflowService } from "src/app/services/tensorflow.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isUploading: boolean = false;
  isProcessing: boolean = false;
  jobCompletes: boolean = false;
  uploadingEnabled: boolean = true;
  progress: number;
  count: string;
  speed: string;
  file: File;

  carsData: number[] = [];
  vansData: number[] = [];
  trucksData: number[] = [];
  landVehiclesData: number[] = [];
  busesData: number[] = [];
  motorbikesData: number[] = [];

  // Total count
  pieData: number[] = [];

  // Chart dataset
  carsChartData: ChartDataSets[] = [{ data: this.carsData, label: "Cars" }];
  vansChartData: ChartDataSets[] = [{ data: this.vansData, label: "Vans" }];
  truckChartData: ChartDataSets[] = [{ data: this.trucksData, label: "Truck" }];
  landVehiclesChartData: ChartDataSets[] = [
    { data: this.landVehiclesData, label: "Land Vehicles" }
  ];
  busChartData: ChartDataSets[] = [{ data: this.busesData, label: "Bus" }];
  motorbikesChartData: ChartDataSets[] = [
    { data: this.motorbikesData, label: "Motorbikes" }
  ];

  // Chart axis
  lineChartLabels: Label[] = [
    "00:00h",
    "01:00h",
    "02:00h",
    "03:00h",
    "04:00h",
    "05:00h",
    "06:00h",
    "07:00h",
    "08:00h",
    "09:00h",
    "10:00h",
    "11:00h",
    "12:00h"
    // "13:00h",
    // "14:00h",
    // "15:00h",
    // "16:00h",
    // "17:00h",
    // "18:00h",
    // "19:00h",
    // "20:00h",
    // "21:00h",
    // "22:00h",
    // "23:00h",
    // "24:00h"
  ];

  lineChartOptions = {
    responsive: true
  };

  carsChartColors: Color[] = [
    {
      borderColor: "rgba(255, 128, 171, 1)",
      backgroundColor: "rgba(255, 128, 171, 0.2)"
    }
  ];

  vansChartColors: Color[] = [
    {
      borderColor: "rgba(130, 177, 255, 1)",
      backgroundColor: "rgba(130, 177, 255, 0.2)"
    }
  ];

  trucksChartColors: Color[] = [
    {
      borderColor: "rgba(255, 255, 0, 1)",
      backgroundColor: "rgba(255, 255, 0, 0.2)"
    }
  ];

  landVehiclesChartColors: Color[] = [
    {
      borderColor: "rgba(158, 158, 158, 1)",
      backgroundColor: "rgba(158, 158, 158, 0.2)"
    }
  ];

  busesChartColors: Color[] = [
    {
      borderColor: "rgba(105, 240, 174, 1)",
      backgroundColor: "rgba(105, 240, 174, 0.2)"
    }
  ];

  motorbikesChartColors: Color[] = [
    {
      borderColor: "rgba(34, 150, 20, 1)",
      backgroundColor: "rgba(34, 150, 20, 0.2)"
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";

  doughnutChartLabels: Label[] = [
    "Cars",
    "Vans",
    "Trucks",
    "Land Vehicles",
    "Buses",
    "Motorbikes"
  ];
  doughnutChartData: MultiDataSet = [this.pieData];
  doughnutChartType: ChartType = "doughnut";

  constructor(private tensorflow: TensorflowService) {}

  ngOnInit() {}

  async Upload() {
    this.uploadingEnabled = false;
    this.jobCompletes = false;
    this.isProcessing = true;
    this.fetchData();
    this.uploadingEnabled = true;
    this.isProcessing = false;
    this.jobCompletes = true;
  }

  fetchData() {
    this.tensorflow.fetchData(this.file).subscribe(vehicles => {
      this.carsData = vehicles.carsData;
      this.vansData = vehicles.vansData;
      this.trucksData = vehicles.trucksData;
      this.landVehiclesData = vehicles.landVehiclesData;
      this.motorbikesData = vehicles.motorbikesData;
      this.count = vehicles.totalData.toString();
    });
  }
}
