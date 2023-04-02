import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EPath } from './enums';

const routes: Routes = [
  { path: EPath.skillBuilder, loadChildren: () => import('./modules/skill-builder/skill-builder.module').then(m => m.SkillBuilderModule) },
  { path: EPath.characterSheet, loadChildren: () => import('./modules/character-sheet/character-sheet.module').then(m => m.CharacterSheetModule) },
  { path: EPath.skillTreeBuilder, loadChildren: () => import('./modules/skill-tree-builder/skill-tree-builder.module').then(m => m.SkillTreeBuilderModule) },
  { path: '**', redirectTo: EPath.skillBuilder, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }