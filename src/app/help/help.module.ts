import { MessageComponent } from './components/message/message.component';
import { AnswersComponent } from './components/answers/answers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: HelpComponent },
  { path: 'mensagem', component: MessageComponent }
];

@NgModule({
  declarations: [
    HelpComponent,
    AnswersComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class HelpModule { }
