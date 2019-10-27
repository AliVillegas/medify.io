import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
@Component({
  selector: 'app-dr-dashboard-card',
  templateUrl: './dr-dashboard-card.component.html',
  styleUrls: ['./dr-dashboard-card.component.scss']
})


export class DrDashboardCardComponent implements OnInit {
  private appointments: Appointment[];

  constructor(private userData: UserdataService) {
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);
   }

  ngOnInit() {

  }

}
