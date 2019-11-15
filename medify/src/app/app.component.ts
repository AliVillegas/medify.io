import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from './userdata.service';
import { Appointment } from './Models/Appointment';
import { Prescription } from './Models/Prescription';
import { Patient } from './Models/Patient';
import { Doctor } from './Models/Doctor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  appointments:Appointment[]
  prescriptions:Prescription[]
  patient:Patient
  doctor:Doctor
  constructor(public http: HttpClient,public userData:UserdataService
    ) {
      this.appointments = []
      this.prescriptions = []
      if(localStorage.getItem("userName")){
        userData.changeName(localStorage.getItem("userName"))
        userData.changeEmail(localStorage.getItem("userEmail"))
        userData.changeId(localStorage.getItem("userId"))
      }
      if(localStorage.getItem("userServiceId")){
        userData.changeServiceId(localStorage.getItem("userServiceId"))
      }
      if(localStorage.getItem("appointments")){
        this.appointments = JSON.parse(localStorage.getItem("appointments"))
        userData.changeAppointments(this.appointments)
      }
      if(localStorage.getItem("prescriptions")){
        this.prescriptions = JSON.parse(localStorage.getItem("prescriptions"))
        userData.changePrescriptions(this.prescriptions)
      }
      if(localStorage.getItem("patient")){
        this.patient = JSON.parse(localStorage.getItem("patient"))
        this.userData.changePatient(this.patient)
      }
      if(localStorage.getItem("doctor")){
        this.doctor = JSON.parse(localStorage.getItem("doctor"))
        this.userData.changeDoctor(this.doctor)
      }
  }


}
