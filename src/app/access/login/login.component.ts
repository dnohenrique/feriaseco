import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../shared/services/colaborador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  empresas: string[];

  constructor(
    private router: Router,
    private graphqlService: ColaboradorService
  ) { }

  async setActionEvent(action) {
    if (action === 'reset-password') {
      this.router.navigate(['recuperar-senha']);
    }

    if ((action === 'authorized') || (action === 'confirmar-email')) {
      await this.loadCollaboratorAllCompanies();

      if (this.empresas.length > 1) {
        this.router.navigate([`/selecionar-empresa`]);
        return;
      }

      const acc = this.empresas[0];
      sessionStorage.setItem('acc', acc);
      sessionStorage.setItem('epi', acc);
      sessionStorage.setItem('empresaSelecionada', acc);

      const epi = sessionStorage.getItem('epi');
      const xdc = sessionStorage.getItem('xdc');

      await localStorage.setItem('epiLocalGuard', epi);
      await localStorage.setItem('xdcLocalGuard', xdc);

      this.router.navigate(['/home']);
    }

    // if (action === 'confirmar-email') {
    //   this.router.navigate(['/confirmar-email']);
    // }
  }

  async loadCollaboratorAllCompanies() {
    const id: string = sessionStorage.getItem('xdc');

    try {
      const result = await this.graphqlService.collaboratorAllCompanies(id);
      this.empresas =  result.data.collaboratorAllCompanies.cnpjs;
    } catch (error) {
      console.error(error);
    }
  }

}
