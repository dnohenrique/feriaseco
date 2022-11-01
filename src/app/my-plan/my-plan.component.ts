import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/shared/support/util';
import { EncryptoDecrypto } from '../shared/support/encrypto-decrypto';
declare var $: any;

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {

  viewPoint = false;
  somenteContaGratuita: boolean;

  constructor(private util: Util,
    private encryptoDecrypto: EncryptoDecrypto,
    private router: Router) { }

  async ngOnInit() {
    $('html,body').scrollTop(0);

    this.util.hideAlertCovid();
    this.util.hideAlertPayment();
    const typePlan = sessionStorage.getItem('typePlan');

    this.somenteContaGratuita = typePlan.toLowerCase().includes('contagratuita') ? true :  false;
  }

  callBackEventPoint(available) {
    this.viewPoint = available > 0;
  }

  goToUpgrade(event: any) {
    const param = this.encryptoDecrypto.set(JSON.stringify(event));

    sessionStorage.setItem('upgradeToken', param);

    this.router.navigate(['upgrade-plano']);
  }
}
