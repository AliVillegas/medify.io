import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { trigger, style, animate, transition, query, state, keyframes, stagger } from '@angular/animations';
@Component({
  selector: 'app-dr-dashboard-card',
  templateUrl: './dr-dashboard-card.component.html',
  styleUrls: ['./dr-dashboard-card.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})


export class DrDashboardCardComponent implements OnInit {
  public appointments: Appointment[];
  public sliceNum:number;
  constructor(private userData: UserdataService) {
  }

  ngOnInit() {
    this.sliceNum = 5;
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);
    console.log("APPOINTMENTS")
    console.log(this.appointments)
  }

  extendSlice(){
    if(this.sliceNum + 1 < this.appointments.length){
      this.sliceNum += 1
    }
    
  }

}
