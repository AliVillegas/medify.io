import { Component, OnInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';

@Component({
  selector: 'app-dr-dashboard',
  templateUrl: './dr-dashboard.component.html',
  styleUrls: ['./dr-dashboard.component.scss']
})

export class DrDashboardComponent implements OnInit {

  constructor(private data:NavbarDataService) { 
    this.initializeNavbarStatus()
  }
  ngOnInit() {

  }
  initializeNavbarStatus(){
    this.data.changeIsLandingPage(false)
    this.data.changeIsDashboardPage(true)
    this.data.changeHasReturnArrow(false)
  }

}
