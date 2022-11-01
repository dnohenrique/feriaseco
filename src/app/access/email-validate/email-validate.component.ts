import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.scss']
})
export class EmailValidateComponent implements OnInit {
  cpf = '';
  cnpj = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
    this.cnpj = this.route.snapshot.paramMap.get('cnpj');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  setActionEvent(action: string) {
    if (action === 'login') {
      this.router.navigate(['login']);
    }
  }
}
