import { Component, OnInit } from '@angular/core';
import 'moment/locale/pt-br';
import * as moment_ from 'moment';
import { Router } from '@angular/router';

const moment = moment_;

@Component({
  selector: 'app-check-monthly-payment',
  templateUrl: './check-monthly-payment.component.html',
  styleUrls: ['./check-monthly-payment.component.scss']
})
export class CheckMonthlyPaymentComponent implements OnInit {
  month = '';
  year = '';
  isDeclinedPayment = false;

  constructor(
    private router: Router
  ) {
    moment.locale('pt-BR');
  }

  ngOnInit() {
    if (sessionStorage.getItem('paymentInformation')) {
      const paymentInformation = JSON.parse(sessionStorage.getItem('paymentInformation'));
      if (paymentInformation) {
        const paymentDate = paymentInformation.vencimento;
        this.month = moment(paymentDate).format('MMMM');
        this.year = moment(paymentDate).year().toString();
        this.isDeclinedPayment = true;
      }
    }
  }

  goToNewCard() {
    this.router.navigate(['/meu-cartao/cadastrar']);
  }

  goToSupport() {
    this.router.navigate(['/ajuda']);
  }

}
