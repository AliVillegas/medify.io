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
import { AppComponent } from '../app.component';
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
        var doctorInstitute = 'Consultorio' + user['custom:name']
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
              var dayNumber = dateType.getDate().toString()
              if(parseInt(dayNumber) < 10){
                dayNumber = "0" + dayNumber.toString();
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
                      this.userData.changeAppointments(doctorData['appointments'])
                      this.toastService.changeIsVisible(true)
                      var msgToSendEs ="Nueva cita se ha creado y enviado a "
                      msgToSendEs += patientData['name']
                      var msgToSendEn = "New Appointment has been Created and sent to"
                      msgToSendEn += patientData['name']
                      var toastMsg = {
                        "msg": msgToSendEs

                      }
                      if(this.translationService.currentLang == 'en'){
                        toastMsg = {
                          "msg": msgToSendEn
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
}
