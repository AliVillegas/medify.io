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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) { }

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
