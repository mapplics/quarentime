import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {Router} from "@angular/router";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage  extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private router: Router,) {

    super(translateService, english, spanish);
  }

  ngOnInit() {
  }



  goToHome() {
    this.router.navigate(['', 'main', 'home']);
  }
}
