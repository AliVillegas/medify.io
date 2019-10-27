import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from './userdata.service';
import { Appointment } from './Models/Appointment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appointments:Appointment[]
  constructor(private http: HttpClient,private userData:UserdataService
    ) {
      this.appointments = []
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
  }

}
