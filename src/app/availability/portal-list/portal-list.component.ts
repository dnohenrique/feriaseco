import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/support/util';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styleUrls: ['./portal-list.component.scss']
})
export class PortalListComponent implements OnInit {
  availablePoints = null;
  availablePointsFormat = '';
  availableDays = 0;
  typePlan;
  productId: number;
  parameterHotel = '';
  parameterAir = '';

  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private util: Util) { }

  ngOnInit() {
    $('body').scrollTop(0);
    this.loadUserById();
    this.actRouter.params.forEach((a) => {
      this.productId = Number(a.productId) || 1;
    });

    this.util.showAlertCovid(this.productId);
  }
  
  error(event) {
    if (event.redirect) {
      location.reload();
    }
  }

  updateProduct(id: number) {
    this.productId = id;
    this.util.showAlertCovid(this.productId);

    this.router.navigate([`home/disponibilidade/${id}`]);
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
