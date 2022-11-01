import { MyPlanComponent } from './my-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanoContratadoModule, PlanosConfig, PlanosModule } from '@ferias-e-co/planos';
import { DetailModule, PointsConfig, PointsModule, MgmModule } from '@ferias-e-co/points';
import { HistoryModule, WalletConfig, WalletModule } from '@ferias-e-co/wallet';
import { environment } from 'src/environments/environment';
import { CheckMonthlyPaymentModule } from '../shared/components/check-monthly-payment/check-monthly-payment.module';

const planosConfig: PlanosConfig = {
  apiUrl: environment.apiUrl,
  apiUrlAssinaturas: environment.apiUrlAssinaturas,
  urlMyPlan: 'meu-plano'
};

const pointsConfig: PointsConfig = {
  apiBookingKrakenQLUrl: environment.urlApiDisponibilidade
};

const walletConfig: WalletConfig = {
  apiBookingKrakenQLUrl: environment.urlApiReserva
};

const routes: Routes = [
  { path: '', component: MyPlanComponent }
];

@NgModule({
  declarations: [MyPlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PlanoContratadoModule,
    DetailModule,
    HistoryModule,
    PlanosModule.forRoot(planosConfig),
    PointsModule.forRoot(pointsConfig),
    WalletModule.forRoot(walletConfig),
    CheckMonthlyPaymentModule,
    MgmModule
  ]
})
export class MyPlanModule { }
