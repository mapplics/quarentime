import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
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
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
    this.questions = this.personalDataService.questions;
    this.currentQuestion = this.questions[0];
    this.personalDataService.currentQuestion = this.currentQuestion;
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
    this.personalDataService._questionAnswers.isTestedPositive = value;
    if (value) {
      this.personalDataService.currentQuestion = this.currentQuestion.yesQuestion;
      this.navController.navigateForward(`/personal-data/intake/questions/yesAnswer`);
    } else {
      this.personalDataService.currentQuestion = this.currentQuestion.noQuestion;
      this.navController.navigateForward(`/personal-data/intake/questions/noAnswer`);
    }
    // else {
    //   this.navController.navigateForward('personal-data/intake/confirm');
    // }
  }

  goBack(): void {
    this.navController.pop();
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
