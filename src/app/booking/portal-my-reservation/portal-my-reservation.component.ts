import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '@ferias-e-co/booking';
import { ColaboradorService } from 'src/app/shared/services/colaborador.service';
import { Util } from 'src/app/shared/support/util';

@Component({
  selector: 'app-portal-my-reservation',
  templateUrl: './portal-my-reservation.component.html',
  styleUrls: ['./portal-my-reservation.component.scss']
})
export class PortalMyReservationComponent implements OnInit {

  collaboratorLoading: boolean;
  collaboratorName: string;
  collaboratorEmail: string;
  productId: number;
  positionProductLeft = 0;

  constructor(
    public actRouter: ActivatedRoute,
    public router: Router,
    public common: Common,
    public util: Util,
    private graphqlService: ColaboradorService
  ) { }

  ngOnInit() {
    this.actRouter.params.forEach((a) => {
      this.productId = Number(a.productId) || 1;
    });

    this.util.hideAlertCovid();
    this.util.hideAlertPayment();
    this.loadUserById();
  }

  error(error) {
    if (error.redirect) {
      location.reload();
    }

    const tokenSearch = localStorage.getItem('tokenSearch');
    const url = 'reservas/message-error/' + tokenSearch + '/' + error.type;
    this.router.navigate([url]);
  }

  async loadUserById() {

    this.collaboratorLoading = false;

    try {
      const xdc: string = sessionStorage.getItem('xdc');
      const result = await this.graphqlService.getColaboradorById(xdc);
      this.collaboratorName = result.data.collaborator.nome;
      this.collaboratorEmail = result.data.collaborator.email;
      this.collaboratorLoading = true;

    } catch (error) {
      this.collaboratorLoading = true;
      console.error(error);
    }

  }

  changeProduct(productId: number) {
    // Produtos desabilitados
    if (productId === 3 || productId === 4 || productId === 5) {
      return false;
    }

    this.productId = productId;

    if (this.util.verifyIsMaxWidth('400px')) {
      this.ajustProduct();
    }
  }

  ajustProduct() {
    switch (this.productId) {
      case 1:
        this.positionProductLeft = 0;
        break;
      case 2:
        this.positionProductLeft = 0;
        break;
      case 3:
        this.positionProductLeft = -19;
        break;
      case 4:
        this.positionProductLeft = -19;
        break;
      case 5:
        this.positionProductLeft = -19;
        break;
    }
  }

}
