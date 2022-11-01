import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { HelpService } from '../../services/help.service';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnChanges {

  @Input() subject: string;
  @Input() searchKeywords: string;
  @Input() clearAnswerFeedback = '';
  @Output() answerFeedback: EventEmitter<string> = new EventEmitter();
  answers: Answer[];
  loading = false;
  requestFailed = false;

  constructor(private helpService: HelpService) {
    localStorage.removeItem('knowledges');
  }

  ngOnChanges(changes) {
    this.requestFailed = false;
    if (changes.subject) {
      this.getAnswers();
    }
    if (changes.searchKeywords && changes.searchKeywords.currentValue !== changes.searchKeywords.previousValue) {
      if (changes.searchKeywords.currentValue) {
        return this.searchKeywordKnowledges();
      }
      return this.getAnswers();
    }

    if (changes.clearAnswerFeedback) {
      this.uncheckAllRadioFeedback();
      this.clearAnswerFeedback = '';
    }
  }

  uncheckAllRadioFeedback() {
    const radioButtons: any = document.getElementsByName('userDocumentType');
    radioButtons.forEach(rad => rad.checked = false);
  }

  async searchKeywordKnowledges() {
    this.loading = true;
    try {
      this.answers = [];
      const allKnowledges = await this.getStoredKnowledges();
      this.answers = this.filterKnowledgesByKeyword(allKnowledges);
    } catch (error) {
      console.error('falha ao carregar base de conhecimento', error);
    }
    this.loading = false;
  }

  async getStoredKnowledges() {
    const allKnowledges = localStorage.getItem('knowledges');
    if (allKnowledges) {
      return JSON.parse(allKnowledges);
    }
    const responseAnswers = await this.helpService.getKnowledge();
    localStorage.setItem('knowledges', JSON.stringify(responseAnswers));
    return responseAnswers;
  }

  filterKnowledgesByKeyword(knowledge): Answer[] {
    return knowledge.filter(el =>
      el.answer.toLowerCase().includes(this.searchKeywords.toLowerCase())
      || el.question.toLowerCase().includes(this.searchKeywords.toLowerCase()));
  }

  async getAnswers() {
    const criteria = this.subject ? this.subject : this.searchKeywords;
    if (criteria) {
      this.loading = true;
      this.answers = [];
      try {
        this.answers = await this.helpService.getKnowledge(criteria);
      } catch (error) {
        console.error(error);
        this.requestFailed = true;
      }

      this.loading = false;
    }
  }

  answerFeedbackClick(feedback: string) {
    this.answerFeedback.emit(feedback);
  }

}
