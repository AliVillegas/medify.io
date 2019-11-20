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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public prescriptions:Prescription[]
  public appointments:Appointment[]
  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService,
    private userData:UserdataService) { 
      this.userData.currentPrescriptions.subscribe(prescriptions => this.prescriptions = prescriptions);
      this.userData.currentAppointments.subscribe(app => this.appointments = app);

    }

  ngOnInit() {
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
