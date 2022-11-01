import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { ProductModule, ReservationModule, MyReservationModule, AlertMessageModule } from '@ferias-e-co/booking';
import {
  ProductModule as ProductAirModule,
  ReservationModule as ReservationAirModule,
  MyReservationModule as MyReservationAirModule,
  AlertMessageModule as AlertAirMessageModule
} from '@ferias-e-co/booking-aereo';
import { FilterSearchModule } from '@ferias-e-co/availability';
import { PortalBookingComponent } from './portal-booking/portal-booking.component';
import { PortalMyReservationComponent } from './portal-my-reservation/portal-my-reservation.component';
import { PortalMessageSuccessComponent } from './portal-message-success/portal-message-success.component';
import { FormularioPagamentoModule, FormularioPagamentoConfig } from '@ferias-e-co/formulario-pagamento';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: 'booking/:parameter/:productId', component: PortalBookingComponent },
  { path: 'minhas-reservas', component: PortalMyReservationComponent },
  { path: 'minhas-reservas/:productId', component: PortalMyReservationComponent },
  { path: 'message-success/:parameter', component: PortalMessageSuccessComponent }
];

const formularioPagamentoConfig: FormularioPagamentoConfig = {
  apiUrl: environment.apiUrl,
  urlRegisterCard: 'meu-cartao/cadastrar'
};

@NgModule({
  declarations: [
    PortalBookingComponent,
    PortalMyReservationComponent,
    PortalMessageSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormularioPagamentoModule.forRoot(formularioPagamentoConfig),
    ProductModule,
    ReservationModule,
    MyReservationModule,
    ReservationModule,
    AlertMessageModule,
    ProductAirModule,
    ReservationAirModule,
    MyReservationAirModule,
    AlertAirMessageModule,
    FilterSearchModule,
    ModalModule.forRoot()
  ]
})
export class BookingPortalModule { }
