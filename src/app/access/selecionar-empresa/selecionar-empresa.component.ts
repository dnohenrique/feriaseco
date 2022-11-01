import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ColaboradorService } from '../../shared/services/colaborador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecionar-empresa',
  templateUrl: './selecionar-empresa.component.html',
  styleUrls: ['./selecionar-empresa.component.scss']
})
export class SelecionarEmpresaComponent implements OnInit {
  logoCompanyURL: string;
  empresas: [];
  userFirstName: string;

  constructor(
    private router: Router,
    private graphqlService: ColaboradorService) { }

  async ngOnInit() {
    this.logoCompanyURL = environment.logoCompanyURL;
    this.userFirstName = sessionStorage.getItem('userFirstName');

    await this.loadCollaboratorAllCompanies();
    const cpf = sessionStorage.getItem('xdc');
    await this.getUserFirstName(cpf);
  }

  async onEmpresaSelecionada(evento: string) {
    sessionStorage.setItem('acc', evento);
    sessionStorage.setItem('epi', evento);
    sessionStorage.setItem('empresaSelecionada', evento);

    const epi = sessionStorage.getItem('epi');
    const xdc = sessionStorage.getItem('xdc');

    await localStorage.setItem('epiLocalGuard', epi);
    await localStorage.setItem('xdcLocalGuard', xdc);

    this.router.navigate(['/home']);
    return;
  }


  async getUserFirstName(cpf) {
    try {
      const result = await this.graphqlService.getColaboradorById(cpf);
      const nameArray = result.data.collaborator.nome.split(' ');
      this.userFirstName = nameArray[0];
      sessionStorage.setItem('userFirstName', this.userFirstName);
    } catch (error) {
      console.error(error);
    }
  }

  async loadCollaboratorAllCompanies() {
    const id: string = sessionStorage.getItem('xdc');

    try {
      const result = await this.graphqlService.collaboratorAllCompanies(id);
      this.empresas = result.data.collaboratorAllCompanies.cnpjs;
    } catch (error) {
      console.error(error);
    }
  }

}
