import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/support/util';
import { Common } from '@ferias-e-co/booking';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

declare var $: any;

@Component({
  selector: 'app-portal-booking',
  templateUrl: './portal-booking.component.html',
  styleUrls: ['./portal-booking.component.scss']
})
export class PortalBookingComponent implements OnInit {
  entityResult: any;
  productId: number;
  name = '';
  email = '';

  constructor(
    public router: Router,
    private actRouter: ActivatedRoute,
    private graphqlService: UserService,
    public common: Common,
    private util: Util
  ) {
    this.loadUserById();
  }

  ngOnInit() {
    $('body').scrollTop(0);
    this.actRouter.params.forEach((a) => {
      this.productId = Number(a.productId) || 1;
    });

    this.util.showAlertCovid(this.productId);
  }

  // Emitir Reserva
  callBackBooking(param: string) {
    this.router.navigate(['reservas/message-success/' + param]);
  }

  callbackGetDetail(availableDays) {
    localStorage.setItem('availableDays', availableDays);

    if (availableDays === 0) {
      this.error({ type: 'Plan' });
    }
  }

  async loadUserById() {
    const sub: string = sessionStorage.getItem('sub');

    try {
      const result = await this.graphqlService.getUserNameById(sub);
      this.name = result.data.user.nome;
      this.email = result.data.user.email;
    } catch (error) {
      console.error(error);
    }
  }

  error(event) {
    if (event.redirect) {
      location.reload();
    }
  }

  goCentralAjuda() {
    this.router.navigate(['/ajuda']);
  }
}
