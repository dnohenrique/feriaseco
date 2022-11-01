import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ColaboradorService } from './../shared/services/colaborador.service';
import { Util } from 'src/app/shared/support/util';
import { MgmTermHtmlMock } from './mocks/MgmTermHtmlMock';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit, AfterViewInit {

  term = 'termos-de-uso';
  userFirstName = '';
  dataAdesao = '';
  useTermHtml = '';
  mgmTermHtml = '';

  constructor(
    private graphqlService: ColaboradorService,
    private util: Util
  ) {

    const url: string = location.href;

    if (url.includes('/termos-de-uso')) {
      this.term = 'termos-de-uso';
    }

    if (url.includes('/politica-de-privacidade')) {
      this.term = 'privacidade';
    }

    if (url.includes('/termos-indique-ganhe')) {
      this.term = 'termos-indique-ganhe';
    }

  }

  ngOnInit() {
    this.util.hideAlertCovid();
    this.util.hideAlertPayment();
    this.loadUserById();
  }

  ngAfterViewInit() {
    this.gotoTop();
  }

  gotoTop() {
    const el = document.querySelector('#navbar-section');
    el.scrollIntoView();
  }

  async loadUserById() {

    try {
      const xdc: string = sessionStorage.getItem('xdc');
      const result = await this.graphqlService.getColaboradorById(xdc);

      this.userFirstName = result.data.collaborator.nome;
      this.dataAdesao = result.data.collaborator.plano.dataAdesao;

      const urlPrivacidadeHotsite = 'assets/documents/ferias-e-co-politica-de-privacidade2019-11-22_v2.pdf';
      const urlPrivacidadePortalColaborador = window.location.href.replace('/termos-de-uso', '/politica-de-privacidade');
      this.useTermHtml = result.data.collaborator.plano.fingerprint.termoUso ? result.data.collaborator.plano.fingerprint.termoUso : '';
      this.mgmTermHtml = MgmTermHtmlMock;

      // POLÍTICA DE PRIVACIDADE:
      this.useTermHtml = this.useTermHtml.replace(urlPrivacidadeHotsite, urlPrivacidadePortalColaborador);
      // disponível neste link:
      this.useTermHtml = this.useTermHtml.replace(urlPrivacidadeHotsite, urlPrivacidadePortalColaborador);
      this.useTermHtml = this.useTermHtml.replace('no pdf', 'neste link');

      if (sessionStorage.getItem('upgradeTermValue')) {
        this.useTermHtml = this.useTermHtml.replace(/aquisitivo:.*./, sessionStorage.getItem('upgradeTermValue'));
      }

    } catch (error) {
      console.error(error);
    }

  }
}
