import { Component, OnInit } from '@angular/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../core/page-interface';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.page.html',
  styleUrls: ['./congratulation.page.scss'],
})
export class CongratulationPage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
  }

}
