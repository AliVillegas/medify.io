import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dr-new-appointment',
  templateUrl: './dr-new-appointment.component.html',
  styleUrls: ['./dr-new-appointment.component.scss']
})
export class DrNewAppointmentComponent implements OnInit {
  private patientName: String
  newAppointmentForm: FormGroup

  constructor(private navData: NavbarDataService, 
    private sidebarData: SidebarDataService,
    private fb:FormBuilder) {

  }
  ngOnInit() {
    this.patientName = "Julián Herrera"
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
    this.newAppointmentForm = this.fb.group({
      title: ''
    })

  this.newAppointmentForm.valueChanges.subscribe()

  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }

}
