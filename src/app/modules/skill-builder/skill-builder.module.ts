import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillBuilderComponent } from './skill-builder.component';


const routes: Routes = [
  { path: '', component: SkillBuilderComponent }
];

@NgModule({
  declarations: [
    SkillBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SkillBuilderModule { }
