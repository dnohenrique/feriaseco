import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MgmService } from '../shared/services/mgm.service';

@Component({
  selector: 'app-mgm',
  templateUrl: './mgm.component.html',
  styleUrls: ['./mgm.component.scss']
})
export class MgmComponent implements OnInit {
  showMgm = false;

  constructor(
    private router: Router,
    private mgmService: MgmService
  ) { }

  async ngOnInit() {
    await this.verificarIndiqueGanhe();
  }

  async verificarIndiqueGanhe() {
    const cnpj = sessionStorage.getItem('acc');
    const cpf = sessionStorage.getItem('xdc');

    try {
      const response = await this.mgmService.consultarSePodeVerIndiqueGanhe(cnpj, cpf);

      if (response) {
        this.showMgm = response.result.acessar ? true : false;
        if (!this.showMgm) {
          this.router.navigate(['/home']);
        }
      } else {
        this.router.navigate(['/home']);
      }

    } catch (error) {
      this.router.navigate(['/home']);
      console.error(error);
    }
  }

  redirectMgmTerm() {
    this.router.navigate(['/termos-indique-ganhe']);
  }

  redirectToHelpPage() {
    this.router.navigate(['/ajuda']);
  }
}
