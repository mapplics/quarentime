import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../../../models/question.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {PersonalDataService} from '../../../../personal-data.service';
import {locale as english} from '../../i18n/en';
import {locale as spanish} from '../../i18n/es';
import {PageInterface} from '../../../../../../core/page-interface';

@Component({
  selector: 'app-no-answer',
  templateUrl: './no-answer.page.html',
  styleUrls: ['./no-answer.page.scss'],
})
export class NoAnswerPage extends PageInterface implements OnInit {

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
    this.personalDataService._questionAnswers.has_recent_travel_last_14_days = value;
    this.personalDataService.currentQuestion = this.question.noQuestion;
    this.navController.navigateForward('personal-data/intake/confirm');
  }

}
