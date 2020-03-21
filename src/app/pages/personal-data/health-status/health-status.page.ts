import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.page.html',
  styleUrls: ['./health-status.page.scss'],
})
export class HealthStatusPage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
  }

}
