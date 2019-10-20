import { Component, OnInit } from '@angular/core';
import { SidebarDataService } from '../sidebar-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLandingPage:Boolean;
  isDoctor:Boolean;
  isPatient:Boolean;

  constructor(private data:SidebarDataService) { 
  }
  ngOnInit() {
    this.data.currentIsLandingPage.subscribe(isLanding => this.isLandingPage = isLanding)
    this.data.currentIsDoctor.subscribe(doctor => this.isDoctor = doctor)
    this.data.currentIsPatient.subscribe(patient => this.isPatient = patient)
  }

}
