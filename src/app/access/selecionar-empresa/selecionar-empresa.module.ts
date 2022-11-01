import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelecionarEmpresaComponent } from './selecionar-empresa.component';
import { SelecionarEmpresaModule } from '@ferias-e-co/identity';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SelecionarEmpresaComponent }
];

@NgModule({
  declarations: [SelecionarEmpresaComponent],
  imports: [
    CommonModule,
    SelecionarEmpresaModule,
    RouterModule.forChild(routes),
  ]
})
export class SelecionarEmpresaModuleWebappModule { }
