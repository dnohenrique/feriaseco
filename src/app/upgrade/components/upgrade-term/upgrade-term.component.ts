import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/support/util';

declare var $: any;

@Component({
  selector: 'app-upgrade-term',
  templateUrl: './upgrade-term.component.html',
  styleUrls: ['./upgrade-term.component.scss']
})
export class UpgradeTermComponent implements OnInit {

  constructor(
    private util: Util,
  ) { 
  }

  ngOnInit() {
    $('html,body').scrollTop(0);

    this.util.hideAlertCovid();
    this.util.hideAlertPayment();
  }

}
