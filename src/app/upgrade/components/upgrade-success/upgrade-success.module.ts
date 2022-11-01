import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { UpgradeSuccessComponent } from './upgrade-success.component';
import { PlanoContratadoModule } from '@ferias-e-co/planos';



const routes: Routes = [
    { path: '', component: UpgradeSuccessComponent }
];

@NgModule({
    declarations: [
        UpgradeSuccessComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ModalModule.forRoot(),
        PlanoContratadoModule
    ],
    exports: [
        UpgradeSuccessComponent
    ]
})
export class UpgradeSuccessModule { }
