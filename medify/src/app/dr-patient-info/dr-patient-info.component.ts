import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
@Component({
  selector: 'app-dr-patient-info',
  templateUrl: './dr-patient-info.component.html',
  styleUrls: ['./dr-patient-info.component.scss']
})
export class DrPatientInfoComponent implements OnInit {
  private name:String
  private bloodType:String
  private weight:String
  private height:String
  private alergies:String
  private cronicDiseases:String
  private notes:String
  private appointments:Appointment[]
  @Input() patientId;

  sub;
  constructor(
    private navData:NavbarDataService, 
    private sidebarData:SidebarDataService,
    private _location: Location,
    private userData: UserdataService,
    private activateRoute: ActivatedRoute,
    ) { 
  }
  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });
    this.userData.currentAppointments.subscribe(appointments => this.appointments = appointments);
    this.appointments.forEach(app =>{
      if(app.patient.id == this.patientId){
        this.name = app.patient.name
        this.bloodType = app.patient.bloodType
        this.weight = app.patient.weight
        this.height = app.patient.height
        this.cronicDiseases = app.patient.cronicDiseases
        this.alergies = app.patient.alergies
        this.notes = app.patient.notes
      }
    })
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
    this.navData.changePageLocation(this._location)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)

  }

}
