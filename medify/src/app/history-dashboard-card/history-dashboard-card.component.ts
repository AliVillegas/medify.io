import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-dashboard-card',
  templateUrl: './history-dashboard-card.component.html',
  styleUrls: ['./history-dashboard-card.component.scss']
})
export class HistoryDashboardCardComponent implements OnInit {
  private diseases: String[];
  private recoveries: String[];

  constructor() { }

  ngOnInit() {
    this.diseases = ['Gripa', 'Fractura', 'Migraña', 'Caries'];
    this.recoveries = ['13/03/2019', '11/08/2019', 'En proceso', 'En proceso'];

  }

}
