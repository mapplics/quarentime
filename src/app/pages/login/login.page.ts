import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService) {
    super(translateService, english , spanish);
  }

  ngOnInit() {
  }

}
