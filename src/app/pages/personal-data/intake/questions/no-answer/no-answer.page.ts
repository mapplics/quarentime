import {Component, OnInit} from '@angular/core';
import {QuestionModel} from '../../../models/question.model';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {PersonalDataService} from '../../../personal-data.service';
import {locale as english} from '../i18n/en';
import {locale as spanish} from '../i18n/es';
import {PageInterface} from '../../../../../core/page-interface';

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

  next() {
    const selected = this.question.options.filter(x => x.selected);
    this.personalDataService._questionAnswers.symptoms = selected.map(x => x.value);
    const noneOpt = this.question.options.find(x => x.value === null);
    const feverOpt = this.question.options.find(x => x.value === 'Fever');
    // todo dependiendo de la respuesta navega a una u a otra
    if (selected.length === 1 && selected.includes(noneOpt)) {
      this.personalDataService._questionAnswers.symptoms = [];
      this.personalDataService._questionAnswers.hasSymptoms = false;
      this.personalDataService.currentQuestion = this.question.noQuestion;
      this.navController.navigateForward('/personal-data/intake/questions/noAnswer/noAnswer');
    } else {
      this.personalDataService._questionAnswers.hasSymptoms = true;
      this.personalDataService.currentQuestion = this.question.yesQuestion;
      this.navController.navigateForward('/personal-data/intake/questions/noAnswer/yesAnswer');
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
    const opts = this.question.options.filter(x => x.value !== null);
    opts.forEach(x => x.disabled = true);
    opts.forEach(x => x.selected = false);
  }

  enableAll(): void {
    const opts = this.question.options.filter(x => x.value !== null);
    opts.forEach(x => x.disabled = false);
  }

  get valid(): boolean {
    return this.question.options.filter(x => x.selected === true).length > 0;
  }

}
