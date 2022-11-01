import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndiqueGanheModule, IndiqueGanheConfig, MgmRegrasModule } from '@ferias-e-co/indique-ganhe';
import { environment } from 'src/environments/environment';
import { MgmComponent } from './mgm.component';

const indiqueGanheConfig: IndiqueGanheConfig = {
  apiMgmUrl: environment.urlApiMgm,
  urlKrakenql: environment.apiUrl
};

const routes: Routes = [
  { path: '', component: MgmComponent }
];

@NgModule({
  declarations: [MgmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IndiqueGanheModule.forRoot(indiqueGanheConfig),
    MgmRegrasModule
  ]
})
export class MgmModule { }
