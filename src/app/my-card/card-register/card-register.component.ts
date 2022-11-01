import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from '@ferias-e-co/booking';
import { UserService } from 'src/app/shared/services/user.service';

declare var $: any;
@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.component.html',
  styleUrls: ['./card-register.component.scss']
})
export class CardRegisterComponent implements OnInit {
  submitCardRegister = false;
  msgErrorCard = '';
  name = '';
  email = '';
  constructor(
    private router: Router,
    private graphqlService: UserService,
    public common: Common) {
    this.loadUserById();
  }

  ngOnInit() {
    $('html,body').scrollTop(0);

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

  submitButtonClick() {
    this.submitCardRegister = true;
  }

  cardRegisterFeedback(cardRegisterResponse: any) {
    this.submitCardRegister = false;

    if (cardRegisterResponse !== null && cardRegisterResponse.status !== undefined) {
      if (cardRegisterResponse.status === 200) {
        this.router.navigate(['meu-cartao/list/success']);
      } else if (cardRegisterResponse.status === 98) {
        this.msgErrorCard = 'Cartão já cadastrado.';
        setTimeout(() => {
          this.common.toScrollTop('.fc-alert-danger');
        });
      } else {
        this.msgErrorCard = 'Confira os dados do seu cartão.';
        setTimeout(() => {
          this.common.toScrollTop('.fc-alert-danger');
        });
      }
    } else {
      setTimeout(() => {
        this.common.toScrollTop('.error');
      });
    }

  }

  back() {
    this.router.navigate(['meu-cartao']);
  }

  error(event) {
    if (event.redirect) {
      location.reload();
    }

    this.common.toScrollTop('.fc-alert-danger');
  }

}
