import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptoDecrypto } from 'src/app/shared/support/encrypto-decrypto';
import { AuthService } from '@ferias-e-co/identity';
import { Util } from 'src/app/shared/support/util';
import { UserService } from 'src/app/shared/services/user.service';
import { CardListService } from '@ferias-e-co/formulario-pagamento';
import { ColaboradorService } from 'src/app/shared/services/colaborador.service';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { environment } from 'src/environments/environment';

declare var $: any;


@Component({
  selector: 'app-plan-upgrade',
  templateUrl: './plan-upgrade.component.html',
  styleUrls: ['./plan-upgrade.component.scss']
})
export class PlanUpgradeComponent implements OnInit {

  planInfo: any;
  upgradePasswordForm: FormGroup;
  submitted = false;
  // invalidPassword = false;
  validPassword = null;
  showPassword = false;
  upgradeSubmitted = null;
  disableUpgradeButton = false;
  upgradeError = false;
  upgradeRegisterForm: FormGroup;
  name = '';
  email = '';
  ehDescontoFolha = false;
  somenteContaGratuita = false;
  warnMeModalVisibility = false;
  loading = false;
  //
  cardRegisterSubmitted = null;
  msgErrorCard = false;
  exibeCartao = false;
  
  constructor(
    private httpClientService: HttpClientService,
    private encryptoDecrypto: EncryptoDecrypto,
    private router: Router,
    private formBuilder: FormBuilder,
    private graphqlService: UserService,
    private authService: AuthService,
    private util: Util,
    private cardListService: CardListService,
    private colaboradorService: ColaboradorService,
  ) {
    // this.loadUserById();
  }

  async ngOnInit() {
    /*     sessionStorage.setItem('xdc', '07078104692');
        sessionStorage.setItem('acc', '04020662000184'); */
    const upgradeToken = this.encryptoDecrypto.get(sessionStorage.getItem('upgradeToken'));
    this.planInfo = JSON.parse(upgradeToken);

    this.upgradePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });

    this.upgradeRegisterForm = this.formBuilder.group({
      upgradeValues: [{ value: null }, [Validators.required]],
      useTerm: [{ value: null }, [Validators.required]]
    });

    this.upgradeRegisterForm.controls.upgradeValues.setValue(null);
    this.upgradeRegisterForm.controls.useTerm.setValue(null);

    $('html,body').scrollTop(0);

    this.util.hideAlertCovid();
    this.util.hideAlertPayment();

    await this.loadUserById();
    await this.loadColaborador();
    await this.loadCards();
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

  async loadCards() {  
    const result = await this.cardListService.getPaymentProfiles(sessionStorage.getItem('xdc'));
    
    this.exibeCartao = this.somenteContaGratuita && result.length === 0 && !this.ehDescontoFolha;
  }

  async loadColaborador() {
    const result = await this.colaboradorService.getColaboradorById(sessionStorage.getItem('xdc'));

    this.ehDescontoFolha = result.data.collaborator.empresa.descontoFolha;
    this.somenteContaGratuita = result.data.collaborator.plano.contaGratuita; 
  }

  validateField(field: string): boolean {
    if (field === 'password') {
      return (this.submitted ||
        (this.upgradePasswordForm.controls.password.dirty && this.upgradePasswordForm.controls.password.touched)) &&
        (this.validPassword === false || this.upgradePasswordForm.controls.password.hasError('required'));
    }

    if (field === 'upgradeValues') {
      return (this.submitted && this.upgradeRegisterForm.controls.upgradeValues.hasError('required'));
    }
    if (field === 'useTerm') {
      return (this.submitted && this.upgradeRegisterForm.controls.useTerm.hasError('required'));
    }

    return null;
  }

  async validateSubmit() {
    this.submitted = true;

    if (this.validateField('upgradeValues')) { return; }
    if (this.validateField('useTerm')) { return; }   

    await this.checkPassword();
    if (this.validateField('password')) { return; }

    if (this.exibeCartao) {
      this.cardRegisterSubmitted = true;
      // console.log('this.cardRegisterSubmitted = true;');
    } else {
      this.loading = true;
      this.upgradeSubmitted = { submitted: true, validPassword: true };
      // console.log({ submitted: true, validPassword: true })
    }
  }


  async checkPassword() {
    // this.upgradeSubmitted = { submitted: true, validPassword: false };
    // this.submitted = true;
    // this.invalidPassword = false;
    const cpf = sessionStorage.getItem('xdc');

    if (this.upgradePasswordForm.valid) {
      this.upgradePasswordForm.disable();
      this.disableUpgradeButton = true;
      try {
        await this.authService.authenticate({ cpf, password: this.upgradePasswordForm.value.password });

        const acc = sessionStorage.getItem('acc');
        const epi = sessionStorage.getItem('epi');
        const xdc = sessionStorage.getItem('xdc');

        sessionStorage.setItem('empresaSelecionada', acc);

        localStorage.setItem('epiLocalGuard', epi);
        localStorage.setItem('xdcLocalGuard', xdc);

        // this.upgradeSubmitted = { submitted: true, validPassword: true };
        this.validPassword = true;
      } catch (error) {
        // this.invalidPassword = true;
        this.validPassword = false;

        console.error(error);
        this.upgradePasswordForm.enable();
        this.disableUpgradeButton = false;
        // throw error;
      }
    }
  }

  goToHelp() {
    this.router.navigate(['ajuda']);
  }

  goToUseTermValue(event: any) {
    const termText = `aquisitivo: R$ ${event}.`;
    sessionStorage.setItem('upgradeTermValue', termText);
  }

  goToUseTerm() {
    window.open('#/termos-de-uso-upgrade', '_blank');
  }

  showPasswordField(event: any) {
    this.showPassword = event;
  }

  goToSuccessUpgrade(event: any) {
    this.upgradePasswordForm.enable();
    this.disableUpgradeButton = false;
    if (event) {
      this.router.navigate(['sucesso-upgrade']);
    } else {
      this.upgradeError = true;
    }
  }

  changePlanoNaoOfertado(event: boolean) {
    this.showPassword = !event;
    if (this.showPassword) {
      this.upgradePasswordForm.enable();
      this.disableUpgradeButton = false;
    }
  }

  // validateFieldAceite(field: string): boolean {
  //   if (field === 'upgradeValues') {
  //     return (this.submitted && this.upgradeRegisterForm.controls.upgradeValues.hasError('required'));
  //   }
  //   if (field === 'useTerm') {
  //     return (this.submitted && this.upgradeRegisterForm.controls.useTerm.hasError('required'));
  //   }
  //   return null;
  // }

  changeCheckNewValuesTerm() {
    this.upgradeRegisterForm.controls.upgradeValues.value === null ? this.upgradeRegisterForm.controls.upgradeValues.setValue(true) :
      this.upgradeRegisterForm.controls.upgradeValues.setValue(null);
  }

  changeCheckUseTerm() {
    this.upgradeRegisterForm.controls.useTerm.value === null ? this.upgradeRegisterForm.controls.useTerm.setValue(true) :
      this.upgradeRegisterForm.controls.useTerm.setValue(null);
  }

  cardRegisterFeedback(cardRegisterResponse) {
    this.msgErrorCard = false;
    this.submitted = false;

    if (cardRegisterResponse !== null && cardRegisterResponse.status !== undefined) {
      if (cardRegisterResponse.status === 200) {
        // this.efetivaUpgrade();
        this.loading = true;
        this.upgradeSubmitted = { submitted: true, validPassword: true };
      } else {
        this.msgErrorCard = true;
        this.upgradePasswordForm.enable();
        this.disableUpgradeButton = false;
        this.cardRegisterSubmitted = false;
        // setTimeout(() => {
        //   this.common.toScrollTop('.fc-alert-danger');
        // });
      }
    } else {
      this.msgErrorCard = true;
      this.upgradePasswordForm.enable();
      this.disableUpgradeButton = false;
      this.cardRegisterSubmitted = false;
      // setTimeout(() => {
      //   this.common.toScrollTop('.error');
      // });
    }
  }

  openWarnMeModal() {
    this.warnMeModalVisibility = true;
  }

  closeWarnMeModal() {
    this.warnMeModalVisibility = false;
  }

  async registerWarnMe() {
    try {
      const warnMeBody = { cpf: sessionStorage.getItem('xdc') };
      await this.httpClientService.post(environment.apiUrlAssinaturas,
        '/assinatura/notificar-upgrade', warnMeBody);
    } catch (error) {
      // if (error.status >= 500 && !error.error.detail) {
      //   this.error = true;
      // }
      console.error('Falha ao registrar interesse de notificação de upgrade.', error);
    }
  }

}
