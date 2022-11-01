import { Component, OnInit } from '@angular/core';
import { MinhaContaService } from '@ferias-e-co/colaborador';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  cnpj = '';
  cpf = '';
  visibilityModal: boolean;
  contactOk = true;

  constructor( private minhaContaService: MinhaContaService ) { }

  async ngOnInit() {
    this.cnpj = sessionStorage.getItem('epi');
    this.cpf = sessionStorage.getItem('xdc');

    this.contactOk = await this.checkContactOk();
  }

  async checkContactOk() {
    const cnpj = sessionStorage.getItem('epi');
    const cpf = sessionStorage.getItem('xdc');
    const result = await this.minhaContaService.obterDadosPessoais(cpf, cnpj);

    if (!result) {
      return false;
    }

    if (!result.localizacao) {
      return false;
    }

    if (!result.localizacao.logradouro ||
      !result.localizacao.cep ||
      !result.localizacao.estado ||
      !result.localizacao.municipio ) { 
      return false;
    }

    return true;
  }

  onChangeVisibilityModal(evento) {
    this.visibilityModal = evento.novoValor;
  }

  setContactSuccessEvent(event) {
    this.contactOk = true;
  }


}
