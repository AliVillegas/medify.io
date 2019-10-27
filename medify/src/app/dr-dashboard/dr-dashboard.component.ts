import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dr-dashboard',
  templateUrl: './dr-dashboard.component.html',
  styleUrls: ['./dr-dashboard.component.scss'],

})

export class DrDashboardComponent implements OnInit {



  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) {

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
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)

  }

}
