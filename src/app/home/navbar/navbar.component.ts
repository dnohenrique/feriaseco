import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ColaboradorService } from '../../shared/services/colaborador.service';
import { AuthService } from '@ferias-e-co/identity';
import { MgmService } from 'src/app/shared/services/mgm.service';
import { environment } from 'src/environments/environment';
import { Util } from '../../shared/support/util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  logoSuaMarca: string;
  @Input() empresaSelecionada: string;
  enableSideBar: boolean;
  openSideBar: boolean;
  lastURL: string;
  userFirstName = '';
  showMgm = false;

  constructor(
    private authService: AuthService,
    private graphqlService: ColaboradorService,
    private mgmService: MgmService,
    private util: Util

  ) {
    this.openSideBar = false;

    if (window.matchMedia('(min-width: 769px)').matches) {
      this.enableSideBar = false;
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
      this.enableSideBar = true;
    }

    window.addEventListener('resize', (event) => {
      this.openSideBar = false;

      if (window.matchMedia('(min-width: 769px)').matches) {
        this.enableSideBar = false;
      }
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.enableSideBar = true;
      }
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLTextAreaElement;
      if (this.openSideBar && (!target.id.includes('sidebar')) && (!target.id.includes('menu-hamburger'))) {
        this.openSideBar = false;
      }
    });
  }

  ngOnInit() {
    this.loadUserById();
    this.verificarIndiqueGanhe();
  }

  async ngOnChanges(changes: SimpleChanges) {
    // if (this.logoSuaMarca) {
    //   let img = document.getElementById('logo-sua-marca');
    //   if (img instanceof HTMLImageElement) {
    //     img.src = this.logoSuaMarca;
    //   }
    //   img = document.getElementById('logo-sua-marca-sidebar');
    //   if (img instanceof HTMLImageElement) {
    //     img.src = this.logoSuaMarca;
    //   }
    // }

    if (this.empresaSelecionada) {
      this.logoSuaMarca = await this.getLogoSuaMarca(this.empresaSelecionada);
      let img = document.getElementById('logo-sua-marca');
      if (img instanceof HTMLImageElement) {
        img.src = this.logoSuaMarca;
      }
      img = document.getElementById('logo-sua-marca-sidebar');
      if (img instanceof HTMLImageElement) {
        img.src = this.logoSuaMarca;
      }
    }
  }

  async getLogoSuaMarca(epi) {
    this.logoSuaMarca = '';
    const base = environment.logoCompanyURL;
    const path = 'contas/logos/' + epi;
    console.warn(base + path);
    await fetch(base + path)
      .then((response) => {
        if (response.ok) {
          // a imagem existe no server
          this.logoSuaMarca = base + path;
        } else {
          console.warn('Request failed ' + epi + '.png');
        }
      })
      .catch((error) => {
        console.warn('Request failed ' + epi + '.png', error);
      });
    // this.logoSuaMarca = '';
    return this.logoSuaMarca;
  }

  closeMenu() {
    this.openSideBar = false;
    sessionStorage.removeItem('upgradeTermValue');
  }

  openCloseMenu() {
    this.openSideBar = !this.openSideBar;
  }

  async logout() {
    this.authService.logout();
    location.reload();
  }

  async verificarIndiqueGanhe() {
    const cnpj = sessionStorage.getItem('acc');
    const cpf = sessionStorage.getItem('xdc');

    try {
      const response = await this.mgmService.consultarSePodeVerIndiqueGanhe(cnpj, cpf);

      if (response) {
        this.showMgm = response.result.acessar ? true : false;
      }

    } catch (error) {
      console.error(error);
    }
  }

  async loadUserById() {
    const cpf = sessionStorage.getItem('xdc');
    const cnpj = sessionStorage.getItem('acc');

    try {
      const result = await this.graphqlService.getColaboradorByCpfCnpj(cpf, cnpj);
      const dadosUser = result.data.collaboratorByCpfCnpj;
      this.userFirstName = dadosUser.nome.split(' ')[0];
      sessionStorage.setItem('firstName', this.userFirstName);
      this.insertScriptKonduto(dadosUser.emailPessoal);
      const tituloPlano = `${dadosUser.plano.tipoPlano} - ${dadosUser.plano.diariasTotais} diárias`;
      this.util.insertScriptSmartlook(
        dadosUser.nome,
        dadosUser.emailPessoal,
        cpf,
        tituloPlano,
        environment.name === 'prod'
      );
    } catch (error) {
      console.error(error);
    }
  }

  insertScriptKonduto(email) {
    const elm = document.createElement('script');
    elm.setAttribute('type', 'text/javascript');
    elm.append(` var customerID = '${email}';
                (function () {
                  var period = 300;
                  var limit = 20 * 1e3;
                  var nTry = 0;
                  var intervalID = setInterval(function () { // loop para retentar o envio
                    var clear = limit / period <= ++nTry;
                    // define o ID do cliente
                    if ((typeof (Konduto) !== "undefined") &&
                      (typeof (Konduto.setCustomerID) !== "undefined")) {
                      window.Konduto.setCustomerID(customerID); // envia o ID para a Konduto
                      clear = true;
                    }
                    if (clear) {
                      clearInterval(intervalID);
                    }
                  }, period);
                })(customerID);`);
    document.body.appendChild(elm);
  }
  // tslint:disable-next-line:max-file-line-count
}
