import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ELanguage, EPath } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rpg';
  ELanguage = ELanguage;
  EPath = EPath;

  constructor(public translate: TranslateService, private router: Router) {
    translate.setDefaultLang(ELanguage.en);
    translate.addLangs([ELanguage.en, ELanguage.fr]);
    translate.use(ELanguage.en);
  }

  onRouteClicked(path: EPath): void {
    this.router.navigate([path]);
  }
}
