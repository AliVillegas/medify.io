import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines: false,
    responsive: true
  };

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Àgosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public chartColors: any[] = [
    { backgroundColor: "#1e88e5" },
    { backgroundColor: "#6ab7ff" },
  ];
  public barChartData = [
    { data: [2, 0, 1, 0, 2, 0, 3, 0, 2, 1, 0, 0], label: 'Citas Médicas' },
    { data: [1, 0, 2, 0, 3, 0, 4, 0, 1, 2, 0, 0], label: 'Recetas' }
  ];

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit() {
  }

}
