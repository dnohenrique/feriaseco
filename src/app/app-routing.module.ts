import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { DadosPessoaisGuard } from './shared/guards/dados-pessoais.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Home' },
        loadChildren: () => import('./availability/availability.module').then(m => m.AvailabilityPortalModule)
      },
      {
        path: 'selecionar-empresa', canActivate: [AuthGuard], data: { title: 'Selecionar empresa' },
        loadChildren: () => import('./access/selecionar-empresa/selecionar-empresa.module').then(m => m.SelecionarEmpresaModuleWebappModule)
      },
      {
        path: 'reservas', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Minhas reservas' },
        loadChildren: () => import('./booking/booking.module').then(m => m.BookingPortalModule)
      },
      {
        path: 'meu-plano', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Meu plano' },
        loadChildren: () => import('./my-plan/my-plan.module').then(m => m.MyPlanModule)
      },
      {
        path: 'minha-conta', canActivate: [AuthGuard], data: { title: 'Minha conta' },
        loadChildren: () => import('./minha-conta/minha-conta.module').then(m => m.MinhaContaWebappModule)
      },
      {
        path: 'indique-ganhe', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Indique e Ganhe' },
        loadChildren: () => import('./mgm/mgm.module').then(m => m.MgmModule)
      },
      {
        path: 'meu-cartao', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Meus cartões' },
        loadChildren: () => import('./my-card/my-card.module').then(m => m.MyCardModule)
      },
      {
        path: 'politica-de-privacidade', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Termos de privacidade' },
        loadChildren: () => import('./term/term.module').then(m => m.TermModule)
      },
      {
        path: 'termos-de-uso', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Termos de uso' },
        loadChildren: () => import('./term/term.module').then(m => m.TermModule)
      },
      {
        path: 'ajuda', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Central de ajuda' },
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
      },
      {
        path: 'upgrade-plano', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Upgrade de plano' },
        loadChildren: () => import('./upgrade/upgrade.module').then(m => m.UpgradeModule)
      },
      {
        path: 'termos-de-uso-upgrade', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Termos de uso upgrade' },
        loadChildren: () => import('./upgrade/components/upgrade-term/upgrade-term.module').then(m => m.UpgradeTermModule)
      },
      {
        path: 'termos-indique-ganhe', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Termos de uso indique e ganhe' },
        loadChildren: () => import('./mgm/mgm-regulamento/mgm-regulamento.module').then(m => m.MgmRegulamentoModule)
      },
      {
        path: 'sucesso-upgrade', canActivate: [AuthGuard, DadosPessoaisGuard], data: { title: 'Sucesso' },
        loadChildren: () => import('./upgrade/components/upgrade-success/upgrade-success.module').then(m => m.UpgradeSuccessModule)
      },
      {
        path: '',
        redirectTo: 'home',
        canActivate: [AuthGuard, DadosPessoaisGuard],
        data: { title: 'Home' },
        pathMatch: 'full'
      }
    ]
  },
  { path: '', data: { title: 'Login' }, loadChildren: () => import('./access/access.module').then(m => m.AccessModule) }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
