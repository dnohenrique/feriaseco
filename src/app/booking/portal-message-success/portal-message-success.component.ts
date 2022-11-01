import { Component, OnInit } from '@angular/core';
import { EncryptoDecryptoService } from '@ferias-e-co/availability';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '@ferias-e-co/booking';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-portal-message-success',
  templateUrl: './portal-message-success.component.html',
  styleUrls: ['./portal-message-success.component.scss']
})
export class PortalMessageSuccessComponent implements OnInit {
  entityOrder: any;
  entityResult: any = {
    dataProduct: {},
    rooms: []
  };
  proccesingId = 1;
  productId = 1;

  constructor(
    public actRouter: ActivatedRoute,
    public router: Router,
    public encryptoDecrypto: EncryptoDecryptoService,
    public common: Common,
    public titleService: Title
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Parabéns! - Férias & Co');

    this.common.toScrollTop();
    this.entityResult = JSON.parse(localStorage.getItem('dataProduct'));
    this.actRouter.params.forEach((a) => {

      if (a.parameter) {
        const json = this.encryptoDecrypto.get(decodeURIComponent(a.parameter));

        if (this.isValidJson(json)) {
          const dataReservation = JSON.parse(json);

          if (dataReservation && dataReservation.orderId) {
            this.entityOrder = dataReservation;

            if (dataReservation.productId === 1) {
              this.mountOrderHospedagem();
            } else {
              this.mountOrderAereo();
            }

            this.entityOrder.email = dataReservation.email;
            this.common.toScrollTop();
          } else {
            this.error();
          }
        } else {
          this.error();
        }
      } else {
        this.error();
      }
    });
  }

  mountOrderHospedagem() {
    if (this.entityOrder.statusId === this.proccesingId) {
      this.entityOrder.title = 'Reserva em processamento';
      this.entityOrder.subTitle = 'Em breve te enviaremos um email de confirmação';
      this.entityOrder.msgDetailReservation = 'Os detalhes de sua reserva estarão em';
    } else {
      this.entityOrder.title = 'Sucesso!';
      this.entityOrder.subTitle = 'Sua hospedagem foi reservada';
      this.entityOrder.msgDetailReservation = 'Veja mais sobre os detalhes de sua reserva no menu';
    }
  }

  mountOrderAereo() {
    if (this.entityOrder.statusId === this.proccesingId) {
      this.entityOrder.title = 'Estamos confirmando sua reserva';
      this.entityOrder.subTitle = 'Aguarde... A confirmação será enviada no seu email.';
    } else {
      this.entityOrder.title = 'Sucesso!';
      this.entityOrder.subTitle = 'Seu voo foi reservado';
    }

    this.entityOrder.msgDetailReservation = 'Os detalhes de sua reserva estarão em';
  }

  error() {
    const url = 'home';
    this.router.navigate([url]);
  }

  isValidJson(text) {
    return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
  }
}
