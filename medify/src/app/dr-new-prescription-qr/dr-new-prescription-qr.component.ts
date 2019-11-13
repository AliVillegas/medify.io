import { Component, OnInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dr-new-prescription-qr',
  templateUrl: './dr-new-prescription-qr.component.html',
  styleUrls: ['./dr-new-prescription-qr.component.scss']
})
export class DrNewPrescriptionQRComponent implements OnInit {
  @Input() patientId;
  sub;
  codeFormGroup: FormGroup;
  codeFormControl = new FormControl('');

  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private _location: Location,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe(params => { this.patientId = params.get('patientId') });

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
