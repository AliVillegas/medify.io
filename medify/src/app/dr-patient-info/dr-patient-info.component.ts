import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
<<<<<<< HEAD
=======
import { Location } from '@angular/common';
>>>>>>> 601a47bb9d5e5809a646b8a9aa0f1cfb8917065c

@Component({
  selector: 'app-dr-patient-info',
  templateUrl: './dr-patient-info.component.html',
  styleUrls: ['./dr-patient-info.component.scss']
})
export class DrPatientInfoComponent implements OnInit {
<<<<<<< HEAD
  private name: String
  private bloodType: String
  private weight: String
  private height: String


  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) {

=======
  private name:String
  private bloodType:String
  private weight:String
  private height:String
  constructor(
    private navData:NavbarDataService, 
    private sidebarData:SidebarDataService,
    private _location: Location
    ) { 
>>>>>>> 601a47bb9d5e5809a646b8a9aa0f1cfb8917065c
  }
  ngOnInit() {
    this.name = "Julián Herrera"
    this.bloodType = "A+"
    this.weight = "69kg"
    this.height = "1.69"
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
