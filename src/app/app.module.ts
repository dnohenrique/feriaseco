import { ApolloModule } from 'apollo-angular';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Common, BookingModule } from '@ferias-e-co/booking';
import { BookingAereoModule } from '@ferias-e-co/booking-aereo';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IdentityConfig, IdentityModule } from '@ferias-e-co/identity';
import { KrakenModule } from './shared/modules/kraken.module';
import ptBr from '@angular/common/locales/pt';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { BookingConfig } from '@ferias-e-co/booking/lib/booking-config.model';
import { BookingAereoConfig } from '@ferias-e-co/booking-aereo/lib/bookingAereo-config.model';
import { FormularioPagamentoConfig, FormularioPagamentoModule } from '@ferias-e-co/formulario-pagamento';
import { AvailabilityConfig } from '@ferias-e-co/availability/lib/availability-config.model';
import { AvailabilityModule } from '@ferias-e-co/availability';
import { AvailabilityAirConfig } from '@ferias-e-co/availability-air/lib/availability-air-config.model';
import { AvailabilityAirModule } from '@ferias-e-co/availability-air';
import { RecommendModule, RecommendConfig } from '@ferias-e-co/microfront-recommend';
import { PointsModule, PointsConfig } from '@ferias-e-co/points';
import { WalletModule, WalletConfig } from '@ferias-e-co/wallet';
import { Guid } from 'guid-typescript';
import { PlanosConfig, PlanosModule } from '@ferias-e-co/planos';
import { Util } from './shared/support/util';
import { UpgradeModule } from './upgrade/upgrade.module';
import { MgmModule } from './mgm/mgm.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ColaboradorConfig, ColaboradorModule } from '@ferias-e-co/colaborador';

registerLocaleData(ptBr);

const colaboradorConfig: ColaboradorConfig = {
  apiUrl: environment.apiUrl
};

const customAvailabilityAir: AvailabilityAirConfig = {
  apiAvailabilityUrl: environment.urlAvailabilityApi,
  urlRedirectBooking: 'reservas/booking/',
  apiUrlBff: environment.urlApiDisponibilidade,
  urlRedirectDetail: 'detail',
  urlRedirectList: environment.urlRedirectList,
  isNewAba: false
};

const customAvailability: AvailabilityConfig = {
  apiAvailabilityUrl: environment.urlAvailabilityApi,
  urlRedirectBooking: 'reservas/booking/',
  urlRedirectDetail: environment.urlRedirectDetail,
  urlRedirectList: environment.urlRedirectList,
  apiUrlBff: environment.urlApiDisponibilidade
};

const identityConfig: IdentityConfig = {
  apiUrl: environment.apiUrl,
  authURL: environment.authURL,
  client_id: environment.client_id,
  client_secret: environment.client_secret,
  origin: environment.originHost,
  portalAssinante: environment.portalAssinante
};

const customBooking: BookingConfig = {
  apiBookingUrl: environment.urlBookingApi,
  urlHome: '',
  apiBookingAvailabilityUrl: environment.urlAvailabilityApi,
  apiBookingKrakenQLUrl: environment.urlApiReserva,
  apiAvailabilityKrakenQLUrl: environment.urlApiDisponibilidade,
  urlMyReservation: 'reservas/minhas-reservas',
  urlIp: environment.urlIp,
  isNewAba: false,
  urlRedirectAvailability: 'home/detail/'
};

const customBookingAir: BookingAereoConfig = {
  apiBookingUrl: environment.urlBookingApi,
  urlHome: '',
  apiBookingAvailabilityUrl: environment.urlAvailabilityApi,
  apiUrlBookingKrakenQL: environment.urlApiReserva,
  apiUrlAvailabilityKrakenQL: environment.urlApiDisponibilidade,
  urlMyReservation: 'reservas/minhas-reservas',
  urlIp: environment.urlIp,
  isNewAba: false,
  urlRedirectAvailability: 'home/list/'
};

const walletConfig: WalletConfig = {
  apiBookingKrakenQLUrl: environment.urlApiReserva
};

const pointsConfig: PointsConfig = {
  apiBookingKrakenQLUrl: environment.urlApiReserva
};

const formularioPagamentoConfig: FormularioPagamentoConfig = {
  apiUrl: environment.urlApiMeusCartoes,
  KrakenQLUrl: environment.urlApiKraken,
  urlRegisterCard: 'meu-cartao/cadastrar'
};

const config: RecommendConfig = {
  uriApi: environment.apiUrl + '/v1',
  urlApiPlan: environment.apiUrl,
  apiAvailabilityUrl: environment.urlAvailabilityApi,
  urlGroup: 'grupo',
  urlRecommend: 'recomendado',
  uriGraphQL: environment.apiUrl,
  urlDetailHotel: 'home/'
};

const planosConfig: PlanosConfig = {
  apiUrl: environment.apiUrl,
  apiUrlAssinaturas: environment.apiUrlAssinaturas,
  urlMyPlan: 'meu-plano'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    ApolloModule,
    HttpClientModule,
    KrakenModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPageScrollCoreModule,
    ColaboradorModule.forRoot(colaboradorConfig),
    IdentityModule.forRoot(identityConfig),
    PlanosModule.forRoot(planosConfig),
    FormularioPagamentoModule.forRoot(formularioPagamentoConfig),
    BookingModule.forRoot(customBooking),
    BookingAereoModule.forRoot(customBookingAir),
    PointsModule.forRoot(pointsConfig),
    WalletModule.forRoot(walletConfig),
    AvailabilityAirModule.forRoot(customAvailabilityAir),
    AvailabilityModule.forRoot(customAvailability),
    RecommendModule.forRoot(config),
    UpgradeModule,
    MgmModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    Common,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private util: Util) {
    this.insertStyles();
    this.insertScriptKonduto();
  }

  insertStyles() {
    const elm = document.createElement('link');
    elm.setAttribute('rel', 'stylesheet');
    elm.setAttribute('type', 'text/css');
    elm.href = `${environment.fcStyles}?v=${Guid.create()}`;
    document.head.appendChild(elm);
  }

  insertScriptKonduto() {
    this.util.insertScriptKonduto();
  }
}
