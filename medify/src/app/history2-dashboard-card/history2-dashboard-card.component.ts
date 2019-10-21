import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history2-dashboard-card',
  templateUrl: './history2-dashboard-card.component.html',
  styleUrls: ['./history2-dashboard-card.component.scss']
})
export class History2DashboardCardComponent implements OnInit {
  private diseases: String[];
  private treatments: String[];

  constructor() { }

  ngOnInit() {
    this.diseases = ['Gripa', 'Fractura', 'Migraña', 'Caries'];
    this.treatments = ['Antiflus 100mg', 'Antianelgesico', 'Paracetamol', 'Antianelgesico'];

  }

}
