import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';

@Component({
  selector: 'app-prescriptions-detail',
  templateUrl: './prescriptions-detail.component.html',
  styleUrls: ['./prescriptions-detail.component.scss'],
})
export class PrescriptionsDetailComponent implements OnInit {


  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
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
