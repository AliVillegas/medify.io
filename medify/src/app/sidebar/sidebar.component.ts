import { Component, OnInit } from '@angular/core';
import { SidebarDataService } from '../sidebar-data.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
declare var $;
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

  constructor(private data: SidebarDataService, private translate: TranslateService,
    public amplifyService: AmplifyService,
    private _router: Router) {
      this.amplifyService = amplifyService;
    this.translate.setDefaultLang(this.language);
  }
  ngOnInit() {
    $(document).ready(function () {
      $("#sidebar .list-unstyled a").each(function () {
        if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
          $(this).parent().addClass('active');
        }
      });
    });
    var l = localStorage.getItem("language");
    if (l != null)
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
  public logout() {
    this.amplifyService
      .auth()
      .signOut()
      .then(() => {
        //this._router.navigateByUrl("");
      })
      .catch(err => {
        return false;
      });
  }

}
