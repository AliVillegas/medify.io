import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLandingPage:Boolean;
  isDashboardPage:Boolean;
  hasReturnArrow:Boolean;
  constructor(private data:NavbarDataService) { 
  }
  ngOnInit() {
    this.data.currentIsLanding.subscribe(isLanding => this.isLandingPage = isLanding)
    this.data.currentDashboard.subscribe(isDashboard => this.isDashboardPage = isDashboard)
    this.data.currentBackArrow.subscribe(hasArrow => this.hasReturnArrow = hasArrow)
  }


}
