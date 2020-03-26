import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.page.html',
  styleUrls: ['./intake.page.scss'],
})
export class IntakePage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private navController: NavController) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
  }

  next(): void {
    this.navController.navigateForward('personal-data/intake/questions');
  }
}
