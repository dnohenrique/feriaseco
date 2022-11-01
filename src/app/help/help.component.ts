import { Component, OnInit } from '@angular/core';
import { HelpService } from './services/help.service';
import { Router } from '@angular/router';
import { Answer } from './models/answer';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  selectedSubject: string;
  subjects = [];
  inputKeywords = '';
  searchKeywords = '';
  allKnowledges: Answer[];
  answersFeedbackHelp = '';
  loading = false;
  browserFirefox = false;
  whatsapp = environment.help.whatsapp;

  constructor(
    private helpService: HelpService,
    private router: Router
  ) { }

  ngOnInit() {
    $('html,body').scrollTop(0);
    this.getSubjects();
    this.getBrowser();
  }

  async getBrowser() {
    this.browserFirefox = navigator.userAgent.indexOf('Firefox') > -1 ? true : false;
  }

  async getSubjects() {
    this.loading = true;
    try {
      this.subjects = await this.helpService.getSubjects();
    } catch (error) {
      console.error('Falha ao buscar assuntos.', error);
    }

    this.loading = false;
  }

  async changeSelectedSubject(id: string) {
    this.inputKeywords = '';
    this.searchKeywords = '';
    this.subjects.map(subject => subject.active = subject.id === id);
    const subjectSelected = this.subjects.find(subject => subject.active = subject.id === id);
    this.selectedSubject = subjectSelected.title;
  }

  onChangeInputKeyword(key) {
    if (key.code === 'Enter' || !this.inputKeywords) {
      this.searchKeywords = this.inputKeywords ? this.inputKeywords.trim() : '';
    }
  }

  btnRedirectToMessage() {
    this.router.navigate(['/ajuda/mensagem']);
  }

  answerFeedback(feedbackEvent) {
    this.answersFeedbackHelp = feedbackEvent;
    if (this.answersFeedbackHelp === 'false') {
      const contactSection = document.getElementById('contact');
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  async btnOpenChat() {
    const whatsappNumber = this.getOnlyNumbers(this.whatsapp);
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&app_absent=false`, '_blank');
  }

  getOnlyNumbers(value) {
    return value.replace(/\D+/g, '');
  }
}
