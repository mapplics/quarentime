import {Component, Input, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {TranslateService} from '@ngx-translate/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends PageInterface implements OnInit {

  @Input() title: string;
  @Input() currentStep: number;
  @Input() completedSteps: number[] = [];

  constructor(public translateService: TranslateService,
              private navController: NavController) {
    super(translateService, english, spanish);
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
    this.navController.navigateRoot('personal-data/' + page);
  }
}
