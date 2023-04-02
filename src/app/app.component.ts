import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ELanguage, EPath } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rpg';
  ELanguage = ELanguage;
  EPath = EPath;

  constructor(public translate: TranslateService, private router: Router) { }

  ngOnInit() {
    this.translate.setDefaultLang(ELanguage.en);
    this.translate.addLangs([ELanguage.en, ELanguage.fr]);
    this.translate.use(ELanguage.en);
  }

  onRouteClicked(path: EPath): void {
    this.router.navigate([path]);
  }
}
