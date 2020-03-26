import {Component, HostListener, OnInit} from '@angular/core';
import {PageInterface} from '../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {QuestionModel} from '../../models/question.model';
import {NavController} from '@ionic/angular';
import {PersonalDataService} from '../../personal-data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage extends PageInterface implements OnInit {

  questions: QuestionModel[];
  accepted: boolean = false;
  currentQuestion: QuestionModel;

  constructor(public translateService: TranslateService,
              private navController: NavController,
              private personalDataService: PersonalDataService) {
    super(translateService, english, spanish);
  }


  ngOnInit() {
    this.questions = this.personalDataService.questions;
    this.currentQuestion = this.questions[0];
  }

  onCheck(): void {
    this.navController.navigateRoot('personal-data/health-status');
  }

  showExplanation(): boolean {
    return this.currentQuestion.first;
  }

  lastStep(): boolean {
    return (!this.currentQuestion.yesQuestion && !this.currentQuestion.noQuestion);
  }

  answer(value) {
    this.currentQuestion.answer = value;
    if (!this.lastStep()) {
      this.currentQuestion = value ? this.currentQuestion.yesQuestion : this.currentQuestion.noQuestion;
      console.log(this.currentQuestion);
      this.navController.navigateRoot('/personal-data/intake/questions');
    } else {
      this.navController.navigateForward('personal-data/intake/confirm');
    }
  }

  goBack(): void {
    this.navController.pop();
  }

  next(): void {
    const selected = this.currentQuestion.options.filter(x => x.selected);
    const noneOpt = this.currentQuestion.options.find(x => x.value === null);
    debugger;
    if (!this.lastStep()) {
      if (selected.length === 1 && selected.includes(noneOpt)) {
        this.currentQuestion = this.currentQuestion.noQuestion;
      } else {
        this.currentQuestion = this.currentQuestion.yesQuestion;
      }
      this.navController.navigateRoot('/personal-data/intake/questions');
    } else {
      this.navController.navigateForward('personal-data/intake/confirm');
    }
  }

  changeChecked(event, opt): void {
    if (opt.value === null) {
      if (event.detail.checked) {
       this.disableAll();
      } else {
        this.enableAll();
      }
    }
  }

  disableAll(): void {
    const opts = this.currentQuestion.options.filter(x => x.value !== null);
    opts.forEach(x => x.disabled = true);
    opts.forEach(x => x.selected = false);
  }

  enableAll(): void {
    const opts = this.currentQuestion.options.filter(x => x.value !== null);
    opts.forEach(x => x.disabled = false);
  }
}
