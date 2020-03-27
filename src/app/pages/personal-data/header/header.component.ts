import {Component, Input, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';
import {PersonalDataService} from '../personal-data.service';
import { VerifyService } from '../verify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends PageInterface implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() name: string;
  @Input() currentStep: number;
  @Input() completedSteps: number[] = [];

  constructor(public translateService: TranslateService,
				private verifyService: VerifyService,
              private personalDataService: PersonalDataService,
              private navController: NavController) {
    super(translateService, english, spanish, macedonian, germany, dutch);               
  }

  ngOnInit() {}

  isCompleted(step): boolean {
    return this.completedSteps.includes(step);
  }

  isCurrent(step): boolean {
    return this.currentStep === step;
  }

  getColor(step): string {
    if (this.isCompleted(step)) {
      return 'completed';
    } else if (this.isCurrent(step)) {
      return 'active';
    } else {
      return '';
    }
  }

  navigateTo(page: string): void {
    if (this.canNavigate(page)) {
      this.navController.navigateRoot('personal-data/' + page);
    }
  }

  canNavigate(page): boolean {
    switch (page) {
      case 'info':
        return true;
      case 'intake':
        return this.verifyService.isVerifiedUser;
        // return !!(+localStorage.getItem('codeVerified'));
      case 'health-status':
        //return  !!(+localStorage.getItem('codeVerified')); // todo add questions answered
        return this.verifyService.isVerifiedUser;
    }
  }
}
