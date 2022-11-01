import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { CheckMonthlyPaymentComponent } from './check-monthly-payment.component';
@NgModule({
    declarations: [CheckMonthlyPaymentComponent],
    imports: [
        CommonModule,
        NgxPageScrollCoreModule.forRoot({duration: 500})
    ],
    exports: [CheckMonthlyPaymentComponent],
    providers: [
    ],
})
export class CheckMonthlyPaymentModule { }
