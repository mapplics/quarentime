import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {QuestionModel} from '../models/question.model';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage extends PageInterface implements OnInit {

  questions: QuestionModel[];
  accepted: boolean = false;

  constructor(public translateService: TranslateService,
              private navController: NavController) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
    this.questions = [];
    this.questions.push(new QuestionModel('1. Have you recently traveled to an area with known local spread of COVID-19?'));
  }

  canCheck(): boolean {
    let resp = true;
    this.questions.forEach(x => {
      if (x.answer === null) {
        resp = false;
      }
    });
    return resp;
  }

  onCheck(): void {
    this.navController.navigateRoot('personal-data/health-status');
  }
}
