import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Models/Appointment';
import { UserdataService } from '../userdata.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-appointment-detail-card',
  templateUrl: './appointment-detail-card.component.html',
  styleUrls: ['./appointment-detail-card.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('450ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppointmentDetailCardComponent implements OnInit {


  appointments: Appointment[]

  constructor(private userData: UserdataService) { }

  ngOnInit() {
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);

  }

}
