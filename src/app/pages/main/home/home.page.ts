import { Component, OnInit } from '@angular/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../../core/page-interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends PageInterface implements OnInit {
   slideOpts = {
    slidesPerView: 2,
  };

  constructor(public translateService: TranslateService,
              ) {
      super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
    // console.log(this.homeService.itemsInformationList);
  }

}
