import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { Prescription } from '../Models/Prescription';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  monthsValue = {}
  appointments: Appointment[]
  prescriptions: Prescription[]
  prescriptionsData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  appointmentsData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  constructor(
    private userData: UserdataService
  ) {
    this.monthsValue = {}
    this.monthsValue['Ene'] = 0
    this.monthsValue['Feb'] = 1
    this.monthsValue['Mar'] = 2
    this.monthsValue['Abr'] = 3
    this.monthsValue['May'] = 4
    this.monthsValue['Jun'] = 5
    this.monthsValue['Jul'] = 6
    this.monthsValue['Ago'] = 7
    this.monthsValue['Sep'] = 8
    this.monthsValue['Oct'] = 9
    this.monthsValue['Nov'] = 10
    this.monthsValue['Dic'] = 11
  }

  ngOnInit() {

    this.userData.currentAppointments.subscribe(appointments => {
      this.appointments = appointments

      this.appointments.forEach(app => {
        this.appointmentsData[this.monthsValue[app.month.toString()]] += 1
      })
      this.barChartData = [
        { data: this.appointmentsData, label: 'Citas Médicas' },
        { data: this.prescriptionsData, label: 'Recetas' }
      ]
    });


    this.userData.currentPrescriptions.subscribe(prescriptions => {
      this.prescriptions = prescriptions

      this.prescriptions.forEach(pre => {
        this.prescriptionsData[this.monthsValue[pre.month.toString()]] += 1
      })
      this.barChartData = [
        { data: this.appointmentsData, label: 'Citas Médicas' },
        { data: this.prescriptionsData, label: 'Recetas' }
      ]
    });



  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines: false,
    responsive: true
  };

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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


}
