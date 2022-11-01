import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { MinhaContaService } from '@ferias-e-co/colaborador';

@Injectable({
  providedIn: 'root'
})

export class DadosPessoaisGuard implements CanActivate {
  isUserLogged: boolean;

  constructor(
    private minhaContaService: MinhaContaService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {

    const accessToken: string = localStorage.getItem('access_token');
    if (!accessToken) {
      return false;
    }

    // const cnpj = sessionStorage.getItem('epi');
    // const cpf = sessionStorage.getItem('xdc');
    const cnpj = localStorage.getItem('epiLocalGuard');
    const cpf = localStorage.getItem('xdcLocalGuard');

    if (!cnpj || !cpf) {
      this.router.navigate(['/login']);
      return false;
    }

    const result = await this.minhaContaService.obterDadosPessoais(cpf, cnpj);

    if (!result) {
      this.router.navigate(['/minha-conta']);
      return false;
    }

    if (!result.localizacao) {
      this.router.navigate(['/minha-conta']);
      return false;
    }

    if (!result.localizacao.logradouro ||
    !result.localizacao.cep ||
    !result.localizacao.estado ||
    !result.localizacao.municipio ) { 
      this.router.navigate(['/minha-conta']);
      return false;
    }

    return true;
  }

}
