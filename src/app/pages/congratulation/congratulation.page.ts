import { Component, OnInit } from '@angular/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../core/page-interface';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.page.html',
  styleUrls: ['./congratulation.page.scss'],
})
export class CongratulationPage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private navController: NavController) {
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
  }

  done(): void {
    this.navController.navigateRoot('main');
  }

}
