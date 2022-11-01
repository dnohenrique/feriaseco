import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/shared/services/colaborador.service';
import { Util } from 'src/app/shared/support/util';
declare var $: any;
@Component({
  selector: 'app-portal-detail',
  templateUrl: './portal-detail.component.html',
  styleUrls: ['./portal-detail.component.scss']
})
export class PortalDetailComponent implements OnInit {
  availableDays = 0;
  availablePointsFormat = '';
  availablePoints = null;
  typePlan;
  constructor(
    private graphqlService: ColaboradorService,
    private util: Util) { }

  ngOnInit() {
    $('body').scrollTop(0);
    this.loadUserById();

    this.util.showAlertCovid(1);
  }

  error(event) {
    if (event.redirect) {
      location.reload();
    }
  }

  async loadUserById() {
    try {
      const result = await this.util.getColaboradorDetail();
      this.availableDays = result.availableDays;
      this.availablePoints = result.availablePoints;
      this.availablePointsFormat = result.availablePointsFormat;
      this.typePlan = result.typePlan;
    } catch (error) {
      console.error(error);
    }
  }
}
