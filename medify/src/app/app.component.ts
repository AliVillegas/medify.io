import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medify';
  public language: string = 'es';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.language);
  }
  public changeLanguage(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }
}
