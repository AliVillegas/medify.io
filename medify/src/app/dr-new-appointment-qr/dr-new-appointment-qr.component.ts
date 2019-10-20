import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dr-new-appointment-qr',
  templateUrl: './dr-new-appointment-qr.component.html',
  styleUrls: ['./dr-new-appointment-qr.component.scss']
})
export class DrNewAppointmentQRComponent implements OnInit {

  constructor(
    private navData:NavbarDataService, 
    private sidebarData:SidebarDataService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

  }

  initializeNavbarStatus(){
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
    this.navData.changePageLocation(this._location)
  }

  initializeSidebarStatus(){
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }

}
