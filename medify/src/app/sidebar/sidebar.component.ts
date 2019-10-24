import { Component, OnInit } from '@angular/core';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

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
    var l = localStorage.getItem("language");
    this.changeLanguage(l);

    this.data.currentIsLandingPage.subscribe(isLanding => this.isLandingPage = isLanding);
    this.data.currentIsDoctor.subscribe(doctor => this.isDoctor = doctor);
    this.data.currentIsPatient.subscribe(patient => this.isPatient = patient);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem("language", this.translate.currentLang);
    });

  }
  public changeLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }


}
