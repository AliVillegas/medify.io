import { Component, OnInit, HostBinding } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition('* => *', [
        query('.card', style({ transform: 'translateX(-100%)' })),
        query('.card',
          stagger('450ms', [
            animate('450ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ])
  ]
})
export class HistoryDetailComponent implements OnInit {

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
