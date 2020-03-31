import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {Router} from "@angular/router";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage  extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private router: Router) {
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
  }



  goToHome() {
    // this.router.navigate(['', 'main', 'home']);
    this.router.navigate(['personal-data']);
  }
}
