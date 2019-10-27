import { Component, OnInit } from '@angular/core';
import { Prescription } from '../Models/Prescription';
import { UserdataService } from '../userdata.service';


@Component({
  selector: 'app-prescription-dashboard-card',
  templateUrl: './prescription-dashboard-card.component.html',
  styleUrls: ['./prescription-dashboard-card.component.scss']
})
export class PrescriptionDashboardCardComponent implements OnInit {
  prescriptions:Prescription[]


  constructor(
    private userData:UserdataService
  ) { }

  ngOnInit() {
    this.prescriptions = []
    this.userData.currentPrescriptions.subscribe(prescriptions => this.prescriptions = prescriptions);


  }

}
