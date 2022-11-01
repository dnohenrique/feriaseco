import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { PlanUpgradeComponent } from './components/plan-upgrade/plan-upgrade.component';
import { PlanoContratadoModule, PlanosConfig, PlanosModule } from '@ferias-e-co/planos';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CardRegisterModule } from '@ferias-e-co/formulario-pagamento';
import { NgxSpinnerModule } from 'ngx-spinner';

const planosConfig: PlanosConfig = {
    apiUrl: environment.urlApiKraken,
    apiUrlAssinaturas: environment.apiUrlAssinaturas,
    urlMyPlan: 'meu-plano'
  };


const routes: Routes = [
    { path: '', component: PlanUpgradeComponent }
];

@NgModule({
    declarations: [
        PlanUpgradeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ModalModule.forRoot(),
        PlanosModule.forRoot(planosConfig),
        PlanoContratadoModule,
        ReactiveFormsModule,
        CardRegisterModule,
        NgxSpinnerModule
    ],
    exports: []
})
export class UpgradeModule { }
