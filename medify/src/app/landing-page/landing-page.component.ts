import { Component, OnInit } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  title = 'medify';
  public language: string = 'es';

  constructor(private navData: NavbarDataService, private sidebarData: SidebarDataService, private translate: TranslateService) {
    this.initializeNavbarStatus();
    this.initializeSidebarStatus();
    this.translate.setDefaultLang(this.language);
  }
  ngOnInit() {

  }
  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(true)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(false)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(true)
    this.sidebarData.changeIsDoctor(false)
    this.sidebarData.changeIsPatient(false)

  }

  public changeLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }

}
