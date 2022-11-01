import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { CardRegisterComponent } from './card-register/card-register.component';
import { RouterModule, Routes } from '@angular/router';
import { CardRegisterModule, CardListModule } from '@ferias-e-co/formulario-pagamento';
import { ModalModule } from 'ngx-bootstrap';
import { CheckMonthlyPaymentModule } from '../shared/components/check-monthly-payment/check-monthly-payment.module';


const routes: Routes = [
    { path: '', component: CardListComponent },
    { path: 'list/:parameter', component: CardListComponent },
    { path: 'cadastrar', component: CardRegisterComponent }
];

// const formularioPagamentoConfig: FormularioPagamentoConfig = {
//     apiUrl: environment.apiUrl,
//     urlRegisterCard: 'meu-cartao/cadastrar'
// };

@NgModule({
    declarations: [
        CardListComponent,
        CardRegisterComponent
    ],
    imports: [
        CommonModule,
        CardRegisterModule,
        CardListModule,
        RouterModule.forChild(routes),
        // FormularioPagamentoModule.forRoot(formularioPagamentoConfig),
        ModalModule.forRoot(),
        CheckMonthlyPaymentModule
    ],
    exports: []
})
export class MyCardModule { }
