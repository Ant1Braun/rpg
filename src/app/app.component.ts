import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, first, Subject, takeUntil } from 'rxjs';
import { ELanguage, EPath } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rpg';
  ELanguage = ELanguage;
  EPath = EPath;
  currentUrl?: string;
  private destroy$ = new Subject<boolean>();

  constructor(
    public translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(ELanguage.en);
    this.translate.addLangs([ELanguage.en, ELanguage.fr]);
    this.translate.use(ELanguage.en);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      const url = (event as NavigationEnd).url;
      this.currentUrl = url.substring(1, url.length);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onRouteClicked(path: EPath): void {
    this.router.navigate([path]);
  }
}
