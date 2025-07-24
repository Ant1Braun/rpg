import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ELanguage } from './enums';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SkillBuilderComponent } from './components/skill-builder/skill-builder.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
      MatToolbarModule,
      TranslatePipe,
      MatMenuModule,
      MatIconModule,
      SkillBuilderComponent,
      MatButtonModule
    ]
})
export class App implements OnInit {
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
