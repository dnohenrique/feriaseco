import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilterSearchModule, DetailModule, ListModule } from '@ferias-e-co/availability';
import { FilterSearchAirModule, ListAirModule } from '@ferias-e-co/availability-air';
import { PortalAvailabilityComponent } from './portal-availability/portal-availability.component';
import { PortalListComponent } from './portal-list/portal-list.component';
import { PortalDetailComponent } from './portal-detail/portal-detail.component';
import { PointsMessageAvailableComponent } from './points-message-available/points-message-available.component';
import { MyReservationActualModule } from '@ferias-e-co/booking';
import { PlanoContratadoModule, PlanosConfig, PlanosModule } from '@ferias-e-co/planos';
import { environment } from 'src/environments/environment';
import { ResultModule } from '@ferias-e-co/microfront-recommend';
import { OwlModule } from 'ngx-owl-carousel';

const routes: Routes = [
  { path: '', component: PortalAvailabilityComponent },
  { path: 'disponibilidade/:productId', component: PortalAvailabilityComponent },
  { path: 'disponibilidade/:parameter', component: PortalAvailabilityComponent },
  { path: 'list/:parameter/:productId', component: PortalListComponent },
  { path: 'detail/:parameter/:id/:productId', component: PortalDetailComponent }
];

const planosConfig: PlanosConfig = {
  apiUrl: environment.apiUrl,
  urlMyPlan: 'meu-plano'
};

@NgModule({
  declarations: [
    PortalAvailabilityComponent,
    PortalListComponent,
    PortalDetailComponent,
    PointsMessageAvailableComponent
  ],
  imports: [
    CommonModule,
    PlanoContratadoModule,
    RouterModule.forChild(routes),
    PlanosModule.forRoot(planosConfig),
    FilterSearchModule,
    DetailModule,
    ListModule,
    MyReservationActualModule,
    ResultModule,
    FilterSearchAirModule,
    ListAirModule,
    OwlModule
  ]
})
export class AvailabilityPortalModule { }
