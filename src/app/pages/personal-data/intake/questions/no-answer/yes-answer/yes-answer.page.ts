import { Component, OnInit } from '@angular/core';
import {QuestionModel} from '../../../../models/question.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {PersonalDataService} from '../../../../personal-data.service';
import {locale as english} from '../../i18n/en';
import {locale as spanish} from '../../i18n/es';
import {PageInterface} from '../../../../../../core/page-interface';

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
    this.personalDataService._questionAnswers.hasRecentTravelBeforeSymptoms = value;
    this.personalDataService.currentQuestion = this.question.noQuestion;
    if (value) {
      this.navController.navigateForward('personal-data/intake/confirm');
    } else {
      this.navController.navigateForward('personal-data/intake/questions/noAnswer/yesAnswer/noAnswer');
    }
  }


}
