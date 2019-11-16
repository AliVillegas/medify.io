import { Component, OnInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../Models/Appointment';
import { Patient } from '../Models/Patient';
import { Doctor } from '../Models/Doctor';
import { loopbackConnPatientsUrl, loopbackConnDoctorsUrl } from '../loopbackConnectors';
import { Auth } from 'aws-amplify';
import { getMatTooltipInvalidPositionError } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastServiceService } from '../toast-service.service';
@Component({
  selector: 'app-dr-new-appointment',
  templateUrl: './dr-new-appointment.component.html',
  styleUrls: ['./dr-new-appointment.component.scss']
})
export class DrNewAppointmentComponent implements OnInit {
  @Input() patientId;
  sub;
  public patientName: String
  public userId: String
  public appointments: Appointment[]
  public location: String
  public patient: Patient
  loopbackPatientsUrl = loopbackConnPatientsUrl
  loopbackDoctorsUrl = loopbackConnDoctorsUrl
  privatePatientsUrl = 'https://api.jsonbin.io/b/5db648c2fe2f084c49258cb1'
  privateDoctorsUrl = 'https://api.jsonbin.io/b/5db64a818c3b0a4aac6920d9'
  newAppointmentForm: FormGroup
  appointmentTitle = new FormControl('');
  appointmentLocation = new FormControl('');
  appointmentDate = new FormControl('');
  appointmentStartTime = new FormControl('');
  appointmentEndTime = new FormControl('');
  //private patientId: String
  constructor(private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private userData: UserdataService,
    private router: Router,
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private translationService: TranslateService,
    private toastService:ToastServiceService,
    private fb: FormBuilder) {

  }
  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });
    console.log("sub" + this.patientId)
    this.http.get(this.loopbackPatientsUrl.concat(this.patientId)).subscribe(
      data => {
        var user = data
        this.patientName = user["name"]
      },
      error =>{
        console.clear()
      }
    );
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

  onClickSubmit(title:string,date,start,end,location){
    if(title != ""){
      if(date != "" && date != undefined){
        if(start != ""){
          if(end != ""){
            if(location != "" && location != undefined){
              this.createNewAppointment(title,date,start,end,location);
            }
          }
        }
      }
    }
  }

  createNewAppointment(title,date,start,end,location){
    console.log("Creating Appointment")
    Auth.currentSession()
      .then(data => {
        var user = data.getIdToken().decodePayload();
        var doctorId = user['email']
        var doctorName = user['custom:name']
        var doctorInstitute = 'consultorio' + user['custom:name']
        this.http.get(this.loopbackDoctorsUrl.concat(doctorId)).subscribe(
          data => {
            var doctorData = data

            this.http.get(this.loopbackPatientsUrl.concat(this.patientId)).subscribe(
            data =>{
              var patientData = data
              var concept = title
              var dateType = new Date(date);
              console.log(date)
              var dayOfTheWeek = dateType.getDay();
              var msgMap = {
                0: "Domingo",
                1 : "Lunes",
                2: "Martes",
                3: "Miércoles",
                4: "Jueves",
                5: "Viernes",
                6: "Sábado"
              }
              if(this.translationService.currentLang == 'en'){
                msgMap = {
                  0: "Sunday",
                  1 : "Monday",
                  2: "Tuesday",
                  3: "Wednesday",
                  4: "Thursday",
                  5: "Friday",
                  6: "Saturday"
                }
              }
              var msgMapMonth = {
                0: "Ene",
                1 : "Feb",
                2: "Mar",
                3: "Abr",
                4: "May",
                5: "Jun",
                6: "Jul",
                7: "Ago",
                8: "Sep",
                9: "Oct",
                10: "Nov",
                11: "Dic"
              }
              if(this.translationService.currentLang == 'en'){
                msgMapMonth = {
                  0: "Jan",
                  1 : "Feb",
                  2: "Mar",
                  3: "Apr",
                  4: "May",
                  5: "Jun",
                  6: "Jul",
                  7: "Aug",
                  8: "Sep",
                  9: "Oct",
                  10: "Nov",
                  11: "Dec"
                }
              }
              var dayName = msgMap[dayOfTheWeek]
              var dayNumber = dateType.getDate()
              if(dayNumber < 10){
                dayNumber = parseInt("0" + dayNumber.toString());
              }
              var monthOfYear = dateType.getMonth()
              var month = msgMapMonth[monthOfYear]
              console.log("dayName" + dayName)
              console.log("dayNum" + dayNumber)
              console.log("month" + month)
              var startTime = start
              var endTime = end
              var patientId = patientData['id']
              var patientName = patientData['name']
              var loc= location.toString()
              var newAppointment = {
                concept : concept,
                month: month,
                dayName: dayName,
                dayNumber: dayNumber,
                startTime: startTime,
                endTime: endTime,
                location: loc,
                doctor: {
                  name: doctorName,
                  institute: doctorInstitute,
                  id: doctorId
                },
                patient: {
                  name: patientName,
                  id : patientId
                }
              }

              console.log(newAppointment)
              doctorData['appointments'].push(newAppointment)
              patientData['appointments'].push(newAppointment)
              this.http.put(this.loopbackDoctorsUrl.concat(doctorId),doctorData).subscribe(
                data => {
                  console.log("success")
                  this.http.put(this.loopbackPatientsUrl.concat(patientId),patientData).subscribe(
                    data =>{
                      
                      this.toastService.changeIsVisible(true)
                      var toastMsg = {
                        "msg": "Nueva cita se ha creado"

                      }
                      if(this.translationService.currentLang == 'en'){
                        toastMsg = {
                          "msg": "New Appointment has been Created"
                        }
                      }
                      this.toastService.changeMessage(toastMsg["msg"].toString())
                      var redirectString = "dr/dashboard"
                      this.router.navigateByUrl(redirectString);
                      window.scroll(0,0);
                      
                    }
                  )

                }
              );

            },
            error =>{

            }
              );


          },
          error =>{
            console.clear()
          }
        );
    });

  }
  onClickSubmitz(title: String, date, start, end) {
    console.log(title)
    var concept = title
    var month = date.toString().substring(4, 7)
    var dayName = "Lunes"
    var dayNumber = date.toString().substring(9, 10)
    var startTime = start
    var endTime = end
    var patientId = "2"
    var doctorId = this.userId
    var location = "San Ángel #27 Alta Vira"
    let headers = new HttpHeaders()
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("versioning", "false");
    headers = headers.set("secret-key", "$2b$10$b3F3emDew3JC/JjHy/0Kgulzg1lNfKkhZ1kSrv3Owm58PhkgEOHQm")
    this.http.get(this.privatePatientsUrl, { headers }).toPromise().then(data => {
      for (let element in data["patients"]) {
        if (element == patientId) {
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
        "concept": concept,
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
      this.http.put(this.privatePatientsUrl, JSON.stringify(JSONData), { headers }).toPromise().then(data => {
        this.http.get(this.privateDoctorsUrl, { headers }).toPromise().then(data => {
          var JSONData = data
          var appointments = JSONData["doctors"][this.userId]["data"]["appointments"]
          var appointment = {
            "concept": concept,
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
          this.http.put(this.privateDoctorsUrl, JSON.stringify(JSONData), { headers }).toPromise().then(data => {
            if (localStorage.getItem("appointments")) {
              var doctor: Doctor = JSON.parse(localStorage.getItem("doctor"))
              this.appointments = JSON.parse(localStorage.getItem("appointments"))
              //this.appointments.push(new Appointment(concept, dayName, dayNumber, startTime, endTime, location, month, this.patient, doctor, appointments.length))
              this.userData.changeAppointments(this.appointments)
            }
          })
          this.router.navigateByUrl('dr/dashboard');
        })
      })
    })
  }
}
