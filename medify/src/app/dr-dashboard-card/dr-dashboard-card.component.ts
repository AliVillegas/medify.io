import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { trigger, style, animate, transition, query, state, keyframes, stagger } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loopbackConnDoctorsUrl } from '../loopbackConnectors';

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
  searchForm: FormGroup
  searchField = new FormControl('');
  searched:Boolean
  loopbackDoctorsUrl = loopbackConnDoctorsUrl
  constructor(
    private userData: UserdataService,
    private http:HttpClient,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searched = false;
    this.searchForm = this.fb.group({
      title: ''
    })
    this.sliceNum = 5;
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);

    console.log("APPOINTMENTS")
    console.log(this.appointments)

  }

  searchAppointment(query) {
    var err = document.getElementById("error")
    var l = localStorage.getItem("language")
    this.searched = true
    if (query === '' || query === ' ') {
      this.http.get(this.loopbackDoctorsUrl.concat(localStorage.getItem('userEmail'))).subscribe(
        data => {
          console.log("Querying data")
          var apps = data['appointments'] as Appointment[]
          this.userData.changeAppointments(apps)
        }
      )
      if (l != null) {
        if (l == "es") {
          err.innerHTML = ""
        }
        else {
          err.innerHTML = ""
        }
      }
    }
    else {
      err.innerHTML = ""
      this.http.get(this.loopbackDoctorsUrl.concat(localStorage.getItem('userEmail'))).subscribe(
        data => {
          console.log("Querying data")
          var apps = data['appointments'] as Appointment[]
          console.log("APPPPP" + apps[0])
          apps = apps.filter(function (app) {
            
            return app.patient.name.toUpperCase().includes(query.toUpperCase()) ||
                   app.concept.toUpperCase().includes(query.toUpperCase()) ||
                   app.dayNumber.toString().toUpperCase().includes(query.toUpperCase()) ||
                   app.month.toUpperCase().includes(query.toUpperCase()) ||
                   app.startTime.toUpperCase().includes(query.toUpperCase()) ||
                   app.location.toUpperCase().includes(query.toUpperCase()) ||
                   app.dayName.toUpperCase().includes(query.toUpperCase())
          })
          this.userData.changeAppointments(apps)
        }
      )

    }
  }

  extendSlice(){
    if(this.sliceNum + 1 < this.appointments.length){
      this.sliceNum += 1
    }
    
  }

}
