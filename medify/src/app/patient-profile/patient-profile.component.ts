import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  private name: String;
  private email: String;

  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService,
    private userData:UserdataService) { }

  ngOnInit() {
    this.userData.currentName.subscribe(name => this.name = name);
    this.userData.currentEmail.subscribe(email => this.email = email);
    this.initializeNavbarStatus();
    this.initializeSidebarStatus();
  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(false)
    this.sidebarData.changeIsPatient(true)
  }

}
