import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../Models/Appointment';
import { Patient } from '../Models/Patient';
import { Doctor } from '../Models/Doctor';
@Component({
  selector: 'app-dr-new-appointment',
  templateUrl: './dr-new-appointment.component.html',
  styleUrls: ['./dr-new-appointment.component.scss']
})
export class DrNewAppointmentComponent implements OnInit {
  public patientName: String
  public userId:String
  public appointments:Appointment[]
  public location:String
  public patient:Patient
  privatePatientsUrl = 'https://api.jsonbin.io/b/5db648c2fe2f084c49258cb1'
  privateDoctorsUrl = 'https://api.jsonbin.io/b/5db64a818c3b0a4aac6920d9'
  newAppointmentForm: FormGroup
  appointmentTitle = new FormControl('');
  appointmentDate = new FormControl('');
  appointmentStartTime = new FormControl('');
  appointmentEndTime = new FormControl('');
  private patientId:String
  constructor(private navData: NavbarDataService, 
    private sidebarData: SidebarDataService,
    private userData:UserdataService,
    private router:Router,
    private http:HttpClient,
    private fb:FormBuilder) {

  }
  ngOnInit() {
    this.patientName = "Julián Herrera"
    this.userData.currentId.subscribe(id => this.userId = id); 
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
    this.newAppointmentForm = this.fb.group({
      title: ''
    })

  this.newAppointmentForm.valueChanges.subscribe()

  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }

  onClickSubmit(title: String, date, start, end) {
    console.log(title)
    var concept = title
    var month = date.toString().substring(4,7)
    var dayName = "Lunes"
    var dayNumber = date.toString().substring(9,10)
    var startTime = start
    var endTime = end
    var patientId = "2"
    var doctorId = this.userId
    var location = "San Ángel #27 Alta Vira"
    let headers = new HttpHeaders()
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("versioning", "false");
    headers = headers.set("secret-key", "$2b$10$b3F3emDew3JC/JjHy/0Kgulzg1lNfKkhZ1kSrv3Owm58PhkgEOHQm")
    this.http.get(this.privatePatientsUrl,{headers}).toPromise().then(data => {
      for (let element in data["patients"]) {
        if(element == patientId){ 
          let patient = data["patients"][element]["data"]
          this.patient = new Patient(patient["name"], patient["email"], patient["password"], patient["id"])
          this.patient.setWeight(patient["weight"])
          this.patient.setHeight(patient["height"])
          this.patient.setBloodType(patient["bloodType"])
          this.patient.setAlergies(patient["alergies"])
          this.patient.setNotes(patient["Notes"])
          this.patient.setCronicDiseases(patient["cronicDiseases"])
        }
      }
      var JSONData = data

      var appointments = JSONData["patients"][patientId]["data"]["appointments"]
      var appointment = {
        "concept":concept,
        "month": month,
        "dayName": dayName,
        "dayNumber": dayNumber,
        "startTime": startTime,
        "endtime": endTime,
        "patientId": patientId,
        "doctorId": doctorId,
        "location": location
      } 
      appointments[appointments.length] = appointment
      console.log(JSONData)
      this.http.put(this.privatePatientsUrl,JSON.stringify(JSONData),{headers}).toPromise().then(data => {
        this.http.get(this.privateDoctorsUrl,{headers}).toPromise().then(data => {
          var JSONData = data
          var appointments = JSONData["doctors"][this.userId]["data"]["appointments"]
          var appointment = {
            "concept":concept,
            "month": month,
            "dayName": dayName,
            "dayNumber": dayNumber,
            "startTime": startTime,
            "endtime": endTime,
            "patientId": patientId,
            "doctorId": doctorId,
            "location": location
          } 
          appointments[appointments.length] = appointment
          this.http.put(this.privateDoctorsUrl,JSON.stringify(JSONData),{headers}).toPromise().then(data => {
            if(localStorage.getItem("appointments")){
              var doctor:Doctor = JSON.parse(localStorage.getItem("doctor"))
              this.appointments = JSON.parse(localStorage.getItem("appointments"))
              this.appointments.push(new Appointment(concept,dayName,dayNumber,startTime,endTime,location,month,this.patient,doctor,appointments.length))
              this.userData.changeAppointments(this.appointments)
            }
          })
          this.router.navigateByUrl('dr/dashboard');
        })
      })
    })
  }
}
