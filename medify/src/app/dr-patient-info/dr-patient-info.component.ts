import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { UserdataService } from '../userdata.service';
import { Appointment } from '../Models/Appointment';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../Models/Doctor';
import { loopbackConnPatientsUrl } from '../loopbackConnectors';
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

    var loopbackPatientsUrl = loopbackConnPatientsUrl
    this.http.get(loopbackPatientsUrl.concat(this.patientId)).subscribe(
      data => {
        console.log('success', data)
        if(data['weight'] != undefined)
          this.weight = data['weight']
        if(data['weight'] == "" || data['weight'] == undefined){
          this.weight = "-"
        }
        if(data['name'] != undefined)
          this.name = data['name']

        if(data['height'] != undefined)
          this.height = data['height']
        if(data['height'] == "" || data['height'] == undefined){
          this.height = "-"
        }

        if(data['bloodType'] != undefined)
          this.bloodType = data['bloodType']
        if(data['bloodType'] == "" || data['weight'] == undefined){
            this.bloodType = "-"
        }
        if(data['notes'] != undefined)
          this.notes = data['notes']
        if(data['bloodType'] == ""){
            this.bloodType = "-"
        }
        if(data['alergies'] != undefined)
          this.alergies = data['alergies']
        if(data['alergies'] == "" || data['weight'] == undefined){
            this.alergies = "-"
        }
        if(data['cronicDiseases'] != undefined)
          this.cronicDiseases = data['cronicDiseases']
        if(data['cronicDiseases'] == "" || data['weight'] == undefined){
            this.cronicDiseases = "-"
        }
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
