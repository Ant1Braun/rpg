import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { CharacterSheetComponent } from './modules/character-sheet/character-sheet.component';
import { DiceBuilderComponent } from './modules/dice-builder/dice-builder.component';
import { DiceRollComponent } from './modules/dice-roll/dice-roll.component';
import { SkillBuilderComponent } from './modules/skill-builder/skill-builder.component';
import { RoutingModule } from './routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSheetComponent,
    SkillBuilderComponent,
    DiceRollComponent,
    DiceBuilderComponent
  ],
  imports: [
    RoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    // Material icon list: https://jossef.github.io/material-design-icons-iconfont/
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}