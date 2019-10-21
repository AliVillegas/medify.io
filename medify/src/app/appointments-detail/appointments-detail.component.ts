import { Component, OnInit, HostBinding } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-appointments-detail',
  templateUrl: './appointments-detail.component.html',
  styleUrls: ['./appointments-detail.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition('* => *', [
        query('.card', style({ transform: 'translateX(-100%)' })),
        query('.card',
          stagger('600ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ])
  ]
})
export class AppointmentsDetailComponent implements OnInit {

  @HostBinding('@pageAnimations')
  public animatePage = true;

  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()
  }
  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(false)
    this.sidebarData.changeIsPatient(true)
  }

}
