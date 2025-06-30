import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ELanguage } from './enums';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  ELanguage = ELanguage;

  constructor(
    public translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(ELanguage.en);
    this.translate.addLangs([ELanguage.en, ELanguage.fr]);
    this.translate.use(ELanguage.en);
    this.matIconRegistry.addSvgIcon(
      'dice',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/dice.svg')
    );
  }
}
