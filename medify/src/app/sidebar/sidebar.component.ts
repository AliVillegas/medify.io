import { Component, OnInit } from '@angular/core';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  title = 'medify';
  public language: string = 'es';

  isLandingPage: Boolean;
  isDoctor: Boolean;
  isPatient: Boolean;

  constructor(private data: SidebarDataService, private translate: TranslateService) {
    this.translate.setDefaultLang(this.language);
  }
  ngOnInit() {
    this.data.currentIsLandingPage.subscribe(isLanding => this.isLandingPage = isLanding)
    this.data.currentIsDoctor.subscribe(doctor => this.isDoctor = doctor)
    this.data.currentIsPatient.subscribe(patient => this.isPatient = patient)
  }
  public changeLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }

}
