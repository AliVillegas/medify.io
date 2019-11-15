import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';

@Component({
  selector: 'app-appointment-dashboard-card',
  templateUrl: './appointment-dashboard-card.component.html',
  styleUrls: ['./appointment-dashboard-card.component.scss']
})
export class AppointmentDashboardCardComponent implements OnInit {

  public appointments: Appointment[];

  constructor(public userData: UserdataService) {
  }
  
  ngOnInit() {
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);

  }



}
