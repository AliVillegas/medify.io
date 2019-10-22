import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public pieChartOptions = {
    responsive: true
  };
  public pieChartLabels = ['Dra. Pérez', 'Dr. Torres', 'Dentista Gomez', 'Dr. Lopez'];
  public pieChartType = 'pie';

  public pieChartData = [2, 2, 3, 1,];

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
