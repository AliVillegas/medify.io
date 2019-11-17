import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from './userdata.service';

import { Appointment } from './Models/Appointment';
import { Prescription } from './Models/Prescription';
import { Patient } from './Models/Patient';
import { Doctor } from './Models/Doctor';
import { Auth } from 'aws-amplify';
import { loopbackConnPatientsUrl, loopbackConnDoctorsUrl } from './loopbackConnectors';
import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  dataIsLoaded:Boolean = false
  appointments:Appointment[]
  prescriptions:Prescription[]
  patient:Patient
  doctor:Doctor
  loopbackPatientsUrl = loopbackConnPatientsUrl
  loopbackDoctorsUrl = loopbackConnDoctorsUrl
  constructor(public http: HttpClient,public userData:UserdataService,
    public amplifyService: AmplifyService

    ) {
      this.amplifyService = amplifyService
      this.appointments = []
      this.prescriptions = []
      
      /*
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
      */
  }

  ngOnInit(){
    this.amplifyService.authStateChange$.subscribe(authState =>
      {
    if (authState.state === "signedIn"){
    Auth.currentSession()
        .then(data => {
          var user = data.getIdToken().decodePayload();
          var userId = user['email']
          if(localStorage.getItem("isDoctor") == "false"){
            console.log("isPatient")
            this.http.get(this.loopbackPatientsUrl.concat(userId)).toPromise().then(
              data => {
                this.appointments = data['appointments']
                this.prescriptions = data['prescriptions']
                this.userData.changeName(data['name'])
                this.userData.changeEmail(data['id'])
                this.userData.changeAppointments(this.appointments)
                this.userData.changePrescriptions(this.prescriptions)
                this.dataIsLoaded = true
              }
            )
          }
    
          else{
            console.log("isDoctor")
           this.http.get(this.loopbackDoctorsUrl.concat(userId)).toPromise().then(
              data=>{
                this.appointments = data['appointments']
                this.userData.changeName(data['name'])
                this.userData.changeEmail(data['id'])
                this.userData.changeServiceId(data['serviceId'])
                this.userData.changeAppointments(this.appointments)
                this.userData.changePrescriptions(this.prescriptions)
                this.dataIsLoaded = true;

              }
            )
          }
        });
    }
  })
}



}
