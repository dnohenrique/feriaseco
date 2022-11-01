import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TermComponent } from './term.component';

const routes: Routes = [
  { path: '', component: TermComponent },
];


@NgModule({
  declarations: [TermComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    TermComponent
  ],

})
export class TermModule { }
