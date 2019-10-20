import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLandingPage:Boolean;
  isDashboardPage:Boolean;
  hasReturnArrow:Boolean;
  pageLocation:Location;
  constructor(private data:NavbarDataService) { 
  }
  
  ngOnInit() {
    this.data.currentIsLanding.subscribe(isLanding => this.isLandingPage = isLanding)
    this.data.currentDashboard.subscribe(isDashboard => this.isDashboardPage = isDashboard)
    this.data.currentBackArrow.subscribe(hasArrow => this.hasReturnArrow = hasArrow)
    this.data.currentPageLocation.subscribe(location => this.pageLocation = location)
  }

  previousPage() {
    this.pageLocation.back(); // <-- go back to previous location on cancel
  }
}
