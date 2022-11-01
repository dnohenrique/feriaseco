import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/support/util';
declare var $: any;

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  constructor(private util: Util) { }

  ngOnInit() {
    $('html,body').scrollTop(0);

    this.util.hideAlertCovid();
    this.util.hideAlertPayment();
  }

  error(event) {
    if (event.redirect) {
      location.reload();
    }
  }
}
