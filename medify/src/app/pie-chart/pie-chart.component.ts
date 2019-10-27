import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Models/Appointment';
import { UserdataService } from '../userdata.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  private appointments:Appointment[]
  constructor(
    private userData:UserdataService
  ) { }

  ngOnInit() {
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);
    var labels:string[] = []
    var data:number[] = []
    var graphData:{String:number} = {}
    this.appointments.forEach(app=>{
      if(labels.indexOf(app.doctor.name.toString()) == -1){
        graphData[app.doctor.name.toString()] = 0 
        labels.push(app.doctor.name.toString())
      }
    })
    this.appointments.forEach(app=>{
      graphData[app.doctor.name.toString()] += 1
    })

    labels.forEach(element => {
      this.pieChartData.push(graphData[element])
    });
    this.pieChartLabels = labels
  }

  public pieChartOptions = {
    responsive: true
  };
  public pieChartLabels = ['Dra. Pérez', 'Dr. Torres', 'Dentista Gomez', 'Dr. Lopez'];
  public pieChartType = 'pie';

  public pieChartData = [];

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
