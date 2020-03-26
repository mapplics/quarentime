import { Component, OnInit } from '@angular/core';
import {locale as english} from '../i18n/en';
import {locale as spanish} from '../i18n/es';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../../../../core/page-interface';
import {QuestionModel} from '../../../models/question.model';
import {PersonalDataService} from '../../../personal-data.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-yes-answer',
  templateUrl: './yes-answer.page.html',
  styleUrls: ['./yes-answer.page.scss'],
})
export class YesAnswerPage extends PageInterface implements OnInit {

  question: QuestionModel;

  constructor(public translateService: TranslateService,
              private navController: NavController,
              public personalDataService: PersonalDataService) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
    this.question = this.personalDataService.currentQuestion;
  }

  answer(value) {
    this.question.answer = value;
    this.personalDataService._questionAnswers.hasRecovered = value;
    this.navController.navigateForward('personal-data/intake/confirm');
  }

}
