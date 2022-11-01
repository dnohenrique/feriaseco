import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhaContaComponent } from './minha-conta.component';
import { MinhaContaModule } from '@ferias-e-co/colaborador';
import { Routes, RouterModule } from '@angular/router';
import { ModalCompletarDadosPessoaisComponent } from './modal-completar-dados-pessoais/modal-completar-dados-pessoais.component';

const routes: Routes = [
  { path: '', component: MinhaContaComponent }
];

@NgModule({
  declarations: [MinhaContaComponent, ModalCompletarDadosPessoaisComponent],
  imports: [
    CommonModule,
    MinhaContaModule,
    RouterModule.forChild(routes),
  ]
})
export class MinhaContaWebappModule { }
