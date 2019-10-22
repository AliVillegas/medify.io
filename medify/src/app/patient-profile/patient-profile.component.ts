import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  private name: String;
  private email: String;
  private dateBorn: String;
  private bloodType: String;
  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) { }

  ngOnInit() {
    this.name = "Juan Perez";
    this.email = "juanp12@gmail.com"
    this.dateBorn = "25/08/1696";
    this.bloodType = "O-";
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
