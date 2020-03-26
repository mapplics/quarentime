import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {PageInterface} from '../../../../core/page-interface';

@Component({
  selector: 'app-why-contact',
  templateUrl: './why-contact.page.html',
  styleUrls: ['./why-contact.page.scss'],
})
export class WhyContactPage extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService, ) {
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
  }

}
