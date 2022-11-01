import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { PasswordRegisterComponent } from './password-register/password-register.component';
import { LoginModule, PasswordModule, EmailConfirmadoModule } from '@ferias-e-co/identity';
import { SolicitarConfirmacaoEmailComponent } from './solicitar-confirmacao-email/solicitar-confirmacao-email.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'email-validate/:cnpj/:token', component: EmailValidateComponent },
  { path: 'email-validate/:cpf/:cnpj/:token', component: EmailValidateComponent },
  { path: 'password-validate/:token', component: PasswordRegisterComponent },
  { path: 'confirmar-email', component: SolicitarConfirmacaoEmailComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarSenhaComponent,
    PasswordRegisterComponent,
    EmailValidateComponent,
    SolicitarConfirmacaoEmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginModule,
    PasswordModule,
    EmailConfirmadoModule,
  ]
})
export class AccessModule { }
