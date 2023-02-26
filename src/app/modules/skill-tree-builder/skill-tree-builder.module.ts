import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillTreeBuilderComponent } from './skill-tree-builder.component';


const routes: Routes = [
  { path: '', component: SkillTreeBuilderComponent }
];

@NgModule({
  declarations: [
    SkillTreeBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SkillTreeBuilderModule { }
