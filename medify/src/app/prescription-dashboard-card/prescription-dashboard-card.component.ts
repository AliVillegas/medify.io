import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-prescription-dashboard-card',
  templateUrl: './prescription-dashboard-card.component.html',
  styleUrls: ['./prescription-dashboard-card.component.scss']
})
export class PrescriptionDashboardCardComponent implements OnInit {

  private doctorName: String
  private place: String
  private prescriptionReason: String
  private date: String


  constructor() { }

  ngOnInit() {
    this.doctorName = "Dr. Gómez";
    this.place = "Hospital Médica Nirvae";
    this.prescriptionReason = "Revisión Diabetes";
    this.date = "29 Octubre 2019";

  }

}
