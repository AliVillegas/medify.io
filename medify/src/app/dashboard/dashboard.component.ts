import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { UserdataService } from '../userdata.service';
import { Prescription } from '../Models/Prescription';
import { Appointment } from '../Models/Appointment';
import { loopbackConnPatientsUrl } from '../loopbackConnectors';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public prescriptions:Prescription[]
  public appointments:Appointment[]
  public loopbackPatientsUrl = loopbackConnPatientsUrl
  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService,
    private userData:UserdataService, private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private router:Router,) { 
      this.userData.currentPrescriptions.subscribe(prescriptions => this.prescriptions = prescriptions);
      this.userData.currentAppointments.subscribe(app => this.appointments = app);

    }

  ngOnInit() {
    this.userData.currentEmail.subscribe(email => {
      if (email.toString() != "" && email != undefined){
        this.http.get(this.loopbackPatientsUrl.concat(email.toString())).subscribe(
          data => {
            console.log('success', data)
            if(data['weight'] == "" || data['weight'] == undefined){
              var redirectString = "patient/new/"
              redirectString += email.toString()
              this.router.navigateByUrl(redirectString);
            }
         
          },
          error => {
    
          }
        )
      }
      
    });
    
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
  }


  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(true)
    this.navData.changeHasReturnArrow(false)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(false)
    this.sidebarData.changeIsPatient(true)
  }

}
