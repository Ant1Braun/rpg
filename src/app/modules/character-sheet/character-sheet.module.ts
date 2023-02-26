import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharacterSheetComponent } from './character-sheet.component';


const routes: Routes = [
  { path: '', component: CharacterSheetComponent }
];

@NgModule({
  declarations: [
    CharacterSheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CharacterSheetModule { }
