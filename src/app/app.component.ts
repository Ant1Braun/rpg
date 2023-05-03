import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELanguage } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ELanguage = ELanguage;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.translate.setDefaultLang(ELanguage.en);
    this.translate.addLangs([ELanguage.en, ELanguage.fr]);
    this.translate.use(ELanguage.en);
  }
}
