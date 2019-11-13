import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dr-new-appointment-qr',
  templateUrl: './dr-new-appointment-qr.component.html',
  styleUrls: ['./dr-new-appointment-qr.component.scss']
})
export class DrNewAppointmentQRComponent implements OnInit {

  codeFormGroup: FormGroup;
  codeFormControl = new FormControl('');

  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private fb: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

    this.codeFormGroup = this.fb.group({
      code: ''
    })

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
