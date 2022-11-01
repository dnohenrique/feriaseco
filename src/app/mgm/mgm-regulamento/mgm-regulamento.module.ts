import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MgmRegrasModule } from '@ferias-e-co/indique-ganhe';
import { MgmRegulamentoComponent } from './mgm-regulamento.component';
import { TermModule } from 'src/app/term/term.module';

const routes: Routes = [
  { path: '', component: MgmRegulamentoComponent }
];

@NgModule({
  declarations: [MgmRegulamentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MgmRegrasModule,
    TermModule
  ],
  exports: [
    MgmRegulamentoComponent
  ]
})
export class MgmRegulamentoModule { }
