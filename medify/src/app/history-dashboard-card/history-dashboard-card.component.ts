import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Prescription } from '../Models/Prescription';

@Component({
  selector: 'app-history-dashboard-card',
  templateUrl: './history-dashboard-card.component.html',
  styleUrls: ['./history-dashboard-card.component.scss']
})
export class HistoryDashboardCardComponent implements OnInit {
  public prescriptions:Prescription[]

  constructor(
    private userData:UserdataService
  ) { 
    this.userData.currentPrescriptions.subscribe(prescriptions => this.prescriptions = prescriptions);
    
  }

  ngOnInit() {
  }

}
