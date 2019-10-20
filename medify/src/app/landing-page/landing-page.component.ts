import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private navData:NavbarDataService, private sidebarData:SidebarDataService) { 
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
  }
  ngOnInit() {

  }
  initializeNavbarStatus(){
    this.navData.changeIsLandingPage(true)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(false)
  }

  initializeSidebarStatus(){
    this.sidebarData.changeIsLandingPage(true)
    this.sidebarData.changeIsDoctor(false)
    this.sidebarData.changeIsPatient(false)

  }

}
