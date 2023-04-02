import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillBuilderComponent } from './skill-builder.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';


const routes: Routes = [
  { path: '', component: SkillBuilderComponent }
];

@NgModule({
  declarations: [
    SkillBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSliderModule,
    MatDividerModule
  ]
})
export class SkillBuilderModule { }
