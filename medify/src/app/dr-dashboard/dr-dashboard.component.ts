import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Observable } from 'rxjs';
import { trigger, style, animate, transition, query, state, keyframes, stagger } from '@angular/animations';

@Component({
  selector: 'app-dr-dashboard',
  templateUrl: './dr-dashboard.component.html',
  styleUrls: ['./dr-dashboard.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition('* => *', [
        query('.row-striped', style({ transform: 'translateX(-150%)' })),
        query('.row-striped',
          stagger('450ms', [
            animate('450ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ]),
  ]
})

export class DrDashboardComponent implements OnInit {

  @HostBinding('@pageAnimations')
  public animatePage = true;


  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) {

  }
  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()

  }
  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(true)
    this.navData.changeHasReturnArrow(false)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)

  }

}
