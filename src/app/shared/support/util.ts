import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ColaboradorService } from '../services/colaborador.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class Util {

  constructor(private graphqlService: ColaboradorService) {
  }

  formatPoints(points) {
    if (points > 0) {
      return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '';
  }

  insertScriptKonduto() {
    const elm = document.createElement('script');
    elm.setAttribute('type', 'text/javascript');
    $(elm).append(`var __kdt = __kdt || [];
                      __kdt.push({ 'public_key': '${environment.kondutoKey}' });
                      __kdt.push({ 'post_on_load': true });   // Envio automático desativado
                      (function () {
                        var kdt = document.createElement('script');
                        kdt.id = 'kdtjs';
                        kdt.type = 'text/javascript';
                        kdt.async = true;
                        kdt.src = 'https://i.k-analytix.com/k.js';
                        var s = document.getElementsByTagName('body')[0];
                        s.parentNode.insertBefore(kdt, s);
                      })();`);
    document.body.appendChild(elm);

  }

  insertScriptSmartlook(nome, email, cpf, plano, production) {

    // const elmHead = document.createElement('script');
    // elmHead.setAttribute('type', 'text/javascript');

    // $(elmHead).append(`window.smartlook||(function(d) {
    // var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    // var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    // c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    // })(document);
    // smartlook('init', 'b3292d2b9c008fa58be82a6cf7c24cf5c59e776d', { region: 'eu' });
    // `);

    // document.head.appendChild(elmHead);

    if (production) {
      const elm = document.createElement('script');
      elm.setAttribute('type', 'text/javascript');
      const uid = cpf;
      $(elm).append(`smartlook('identify', '${uid}', {
                      'name': '${nome}',
                      'email': '${email}',
                      'package': '${plano}'
                    });`);


      document.body.appendChild(elm);
    }

  }
  async getColaboradorDetail() {
    try {
      let availablePoints = 0;
      let availablePointsFormat = '';
      const xdc: string = sessionStorage.getItem('xdc');
      const acc: string = sessionStorage.getItem('acc');
      const result = await this.graphqlService.getColaboradorByCpfCnpj(xdc, acc);
      if (!result) {
        return {};
      }

      const collaborator = result.data.collaboratorByCpfCnpj;
      const availableDays = collaborator.plano.diariasDisponiveis;
      const typePlan = 'Plano ' + collaborator.plano.tipoPlano;
      const userFirstName = collaborator.nome;
      if (collaborator.carteira && collaborator.carteira.pontos) {
        availablePoints = collaborator.carteira.pontos.saldo;
        availablePointsFormat = this.formatPoints(availablePoints);
      }
      return {
        availableDays,
        availablePoints,
        availablePointsFormat,
        userFirstName,
        typePlan
      };
    } catch (error) {
      console.error(error);
    }

  }

  verifyIsMaxWidth(maxWidth: string) {
    return window.matchMedia('(max-width: ' + maxWidth + ')').matches ? true : false;
  }

  verifyIsMobile() {
    return window.matchMedia('(max-width: 657px)').matches ? true : false;
  }

  verifyIsTablet() {
    return window.matchMedia('(min-width: 658px) and (max-width: 1374px)').matches ? true : false;
  }

  verifyIsWidthResponsive() {
    return window.matchMedia('(min-width: 616px) and (max-width: 1199px)').matches ? true : false;
  }

  showAlertCovid(productId: number) {
    if (!sessionStorage.getItem('alert')) {
      if (productId === 1) {
        $('#alertCovid19 #productId1').removeClass('display-none').addClass('display-block');
        $('#alertCovid19 #productId2').removeClass('display-block').addClass('display-none');
      } else {
        $('#alertCovid19 #productId1').removeClass('display-block').addClass('display-none');
        $('#alertCovid19 #productId2').removeClass('display-none').addClass('display-block');
      }

      $('#alertCovid19').removeClass('display-none').addClass('display-block');
    } else {
      $('#alertCovid19').removeClass('display-block').addClass('display-none');
    }
  }

  hideAlertCovid() {
    $('#alertCovid19').animate({ height: '0%' }, 300);

    setTimeout(() => {
      $('#alertCovid19').removeClass('display-block').addClass('display-none');
    }, 300);

    sessionStorage.setItem('alert', '1');
  }

  hideAlertPayment() {
    $('#alertPayment').animate({ height: '0%' }, 300);

    setTimeout(() => {
      $('#alertPayment').removeClass('display-block').addClass('display-none');
    }, 300);

    sessionStorage.setItem('alert', '1');
  }

  hideAlertConfirmarEmail() {
    $('#alertConfirmarEmail').animate({ height: '0%' }, 300);

    setTimeout(() => {
      $('#alertConfirmarEmail').removeClass('display-block').addClass('display-none');
    }, 300);

    sessionStorage.setItem('alert', '1');
  }
  // tslint:disable-next-line:max-file-line-count
}
