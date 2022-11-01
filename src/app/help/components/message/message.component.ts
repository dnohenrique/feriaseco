import { HelpService } from './../../services/help.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageModel } from '../../models/message-model';
import { ReasonsMock } from '../../mocks/reasonsMock';
import { TypesMock } from '../../mocks/typesMock';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  subjects = [];
  selectedSubject: string;
  reasons = ReasonsMock;
  types = TypesMock;
  inputKeywords = '';
  fileToUpload: File = null;
  messageForm: FormGroup;
  answersFeedbackHelp = '';
  errorOnSubmit = false;
  submitted = false;
  loading = false;
  clearAnswerFeedback = '';

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private helpService: HelpService,
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit() {

    this.titleService.setTitle('Formulário de contato - Férias & Co');

    this.messageForm = this.formBuilder.group({
      subject: ['', Validators.required],
      type: ['', Validators.required],
      reason: [''],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]]
    });
    this.getSubjects();
  }

  async getSubjects() {
    this.loading = true;
    this.subjects = await this.helpService.getSubjects();
    this.loading = false;
  }

  async changeSelectedSubject(title: string) {
    this.changeAnswersDidHelp('');
    this.subjects.map(subject => subject.active = subject.title === title);
    const subjectSelected = this.subjects.find(subject => subject.active = subject.title === title);
    this.selectedSubject = subjectSelected.title;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
  }

  async submitMessage() {
    this.submitted = true;
    if (!this.messageForm.valid || !this.isReasonsValid()) {
      console.warn('Dados inválidos', this.messageForm.value);
      return;
    }
    this.loading = true;
    try {
      const messageBody = new MessageModel(this.messageForm.value);
      this.messageForm.disable();
      await this.helpService.sendMessage(messageBody);
      this.childModal.show();
    } catch (error) {
      console.error('Falha aou enviar mensagem', error);
      this.messageForm.enable();
      this.loading = false;
      this.errorOnSubmit = true;
    }
  }

  changeAnswersDidHelp(value: string) {
    this.answersFeedbackHelp = value;
    if (value === 'false') {
      this.scrollToElement('feedback-section');
    }
  }

  getReasonsFromType(type: string) {
    const selectedType = this.types.find(m => type === m.name);
    return selectedType.reasons;
  }

  field = (name) => this.messageForm.get(name).value;

  isReasonsValid(): boolean {
    return this.field('type') && this.field('reason').length > 0;
  }

  hideChildModal(): void {
    this.childModal.hide();
    this.scrollToElement('navbar-section');
    this.router.navigate(['/ajuda']);
  }

  scrollToElement(id: string): void {
    const elem = document.getElementById(id);
    elem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
