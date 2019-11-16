import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../Models/Doctor';
@Component({
  selector: 'app-dr-patient-info',
  templateUrl: './dr-patient-info.component.html',
  styleUrls: ['./dr-patient-info.component.scss']
})
export class DrPatientInfoComponent implements OnInit {
  public name:String
  public bloodType:String
  public weight:String
  public height:String
  public alergies:String
  public cronicDiseases:String
  public notes:String
  public appointments:Appointment[]
  @Input() patientId;

  sub;
  constructor(
    private navData:NavbarDataService, 
    private sidebarData:SidebarDataService,
    private _location: Location,
    private userData: UserdataService,
    private activateRoute: ActivatedRoute,
    private http: HttpClient
    ) { 
  }
  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });

    var loopbackPatientsUrl = 'http://localhost:3000/patients/'
    this.http.get(loopbackPatientsUrl.concat(this.patientId)).subscribe(
      data => {
        console.log('success', data)
        if(data['weight'] != undefined)
          this.weight = data['weight']

        if(data['height'] != undefined)
          this.height = data['height']
        if(data['bloodType'] != undefined)
          this.bloodType = data['bloodType']
        if(data['notes'] != undefined)
          this.notes = data['notes']
        if(data['alergies'] != undefined)
          this.alergies = data['alergies']
        if(data['cronicDiseases'] != undefined)
          this.cronicDiseases = data['cronicDiseases']
      },
      error => {

      }
    )
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
