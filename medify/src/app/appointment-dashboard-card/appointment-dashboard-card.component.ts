import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-dashboard-card',
  templateUrl: './appointment-dashboard-card.component.html',
  styleUrls: ['./appointment-dashboard-card.component.scss']
})
export class AppointmentDashboardCardComponent implements OnInit {

  private doctorName: String
  private place: String
  private appointmentReason: String
  private time: String
  private address: String
  private date: String

  constructor() { }

  ngOnInit() {
    this.doctorName = "Dra. Torres";
    this.place = "Consultorio Especializado";
    this.appointmentReason = "Dolor De cabeza";
    this.address = "Av. Libertad 22";
    this.date = "28/10/2019"
    this.time = "16:30";
  }


}
