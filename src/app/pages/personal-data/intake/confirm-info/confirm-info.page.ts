import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-confirm-info',
  templateUrl: './confirm-info.page.html',
  styleUrls: ['./confirm-info.page.scss'],
})
export class ConfirmInfoPage extends PageInterface implements OnInit {

  checkboxes = [false, false];

  constructor(public translateService: TranslateService,
              private navController: NavController) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
  }

  next(): void {
    this.navController.navigateRoot('personal-data/health-status');
  }

  terms(): void {

  }

  policies(): void {

  }

  get btnAvailable(): boolean {
    return this.checkboxes.filter(x => x === false).length === 0;
  }
}
