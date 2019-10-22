import { Component, OnInit } from '@angular/core';
import {Appointment} from './Appointment'
@Component({
  selector: 'app-dr-dashboard-card',
  templateUrl: './dr-dashboard-card.component.html',
  styleUrls: ['./dr-dashboard-card.component.scss']
})


export class DrDashboardCardComponent implements OnInit {
  private appointments: Appointment[];

  constructor() { }

  ngOnInit() {
    this.appointments = [
      new Appointment("Julián Herrera", "Lunes", "15", "Sep", "Revisión Cáncer y Quimioterapia"),
      new Appointment("Saúl Neri", "Martes", "16", "Sep", "Defícit de Atención en clases"),
      new Appointment("Ali Villegas", "Viernes", "03", "Oct", "Cita Nutriología")
    ]

  }

}
