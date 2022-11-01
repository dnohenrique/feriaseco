import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/shared/support/util';
import { ColaboradorService } from '../shared/services/colaborador.service';
import { UserService } from '../shared/services/user.service';
import { PaymentService } from '../shared/services/payment.service';
import { AssinaturaService } from '@ferias-e-co/identity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  background: string;
  logoSuaMarca: string;
  empresaSelecionada: string;

  showAlertDeclinedPayment = false;
  showAlertCovid = false;
  showAlertConfirmarEmail = false;
  statusReenvioEmail: any;

  messageSuccess = '';
  messageError = '';
  messageWarning = '';

  constructor(
    private assinaturaService: AssinaturaService,
    private router: Router,
    private util: Util,
    private colaboradorService: ColaboradorService,
    private userService: UserService,
    private paymentService: PaymentService) {
    window.scrollTo(0, 1);

    document.addEventListener('DOMContentLoaded', (event) => {
      this.changeBackgroundColor();
    });

    document.addEventListener('click', (event) => {
      this.changeBackgroundColor();
    });

    window.addEventListener('resize', (event) => {
      this.changeBackgroundColor();
    });

    window.addEventListener('scroll', (event) => {
      this.changeBackgroundColor();
    });

    sessionStorage.setItem('paymentInformation', null);
  }

  async getColaboratorPaymentType(empresaSelecionada) {
    let isPayroll = false;
    await this.colaboradorService.getPaymentType(empresaSelecionada, sessionStorage.getItem('xdc')).then(result => {
      if (result && result.colaboradores && result.colaboradores.length > 0) {
        isPayroll = result.colaboradores[0].empresa.descontoFolha;
      }
    }).catch(error => {
      console.error(error);
    });
    return isPayroll;
  }

  async checkPayment() {
    let isDeclinedPayment = false;
    await this.paymentService.getPaymentStatus(sessionStorage.getItem('xdc')).then(result => {
      if (result.temPendencia) {
        const paymentInformation = result;
        const alert = paymentInformation.alertas.filter(item => item.situacao.toUpperCase() === 'REPROVADO_GATEWAY').sort().reverse()[0];

        if (alert) {
          sessionStorage.setItem('paymentInformation', JSON.stringify(alert));
          isDeclinedPayment = true;
        }
      }

    }).catch(error => {
      console.error(error);
    });
    return isDeclinedPayment;
  }

  changeBackgroundColor() {
    const url: string = location.href;
    this.background = 'background_default';

    if (url.includes('/ajuda')) {
      this.background = 'background_gray';
    }

    if (url.includes('/meu-plano') || url.includes('/minhas-reservas')) {
      this.background = 'background_gray';
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.background = 'background_default';
      }
    }

  }

  // tslint:disable-next-line: cyclomatic-complexity
  async onActivate(event: any) {

    const dataConfirmacaoEmail = await this.loadUserById();

    this.empresaSelecionada = sessionStorage.getItem('empresaSelecionada');
    if (this.empresaSelecionada) {
      let isDeclinedPayment = false;
      let isPayroll = false;

      isPayroll = await this.getColaboratorPaymentType(this.empresaSelecionada);

      sessionStorage.setItem('creditCard', isPayroll ? 'false' : 'true');

      if (!isPayroll) {
        isDeclinedPayment = await this.checkPayment();
        if (isDeclinedPayment && !sessionStorage.getItem('alert')) {
          this.showAlertDeclinedPayment = true;
        }
      }

      if (!isDeclinedPayment && !dataConfirmacaoEmail) {
        this.showAlertConfirmarEmail = true;
      }

      // if (!isDeclinedPayment && dataConfirmacaoEmail) {
      //   this.showAlertCovid = true;
      //   this.util.showAlertCovid(1);
      // }
    }


  }

  async loadUserById() {
    const sub: string = sessionStorage.getItem('sub');

    try {
      const result = await this.userService.getUserNameById(sub);
      return result.data.user.dataConfirmacaoEmail;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  hideAlert() {
    this.util.hideAlertCovid();
  }

  hideAlertPayment() {
    this.util.hideAlertPayment();
  }

  hideAlertConfirmarEmail() {
    this.util.hideAlertConfirmarEmail();
  }

  goToCardPage() {
    this.router.navigate(['/meu-cartao']);
  }

  async onSendEmail() {
    this.statusReenvioEmail = '';
    const id = sessionStorage.getItem('xdc');
    try {
      const resp = await this.assinaturaService.reenviarEmailConfirmacao(id);
      if (resp.email) {
        this.statusReenvioEmail = true;
        this.showAlertConfirmarEmail = false;
        this.messageSuccess = `<b>E-mail enviado com sucesso!</b>.<br>
        Verifique sua caixa de entrada. Basta abrir o email e confirmar no botão.
        Caso não tenha recebido verifique as pastas de <b>“Spam”</b>
         ou <b>“Promoções”</b>`;
        return;
      }
    } catch (error) {
      this.statusReenvioEmail = false;
      this.messageError = '<b>Houve um erro ao enviar o e-mail.</b> Tente novamente mais tarde, obrigada.';
      console.error(error);
    }

  }

  onCentralAjuda() {
    this.router.navigate(['/ajuda']);
  }
// tslint:disable-next-line:max-file-line-count
}
