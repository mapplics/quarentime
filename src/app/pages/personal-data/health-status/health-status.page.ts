import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import { NavController } from '@ionic/angular';
import {PersonalDataService} from '../personal-data.service';
import {StorageService} from '../../../shared/services/storage.service';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.page.html',
  styleUrls: ['./health-status.page.scss'],
})
export class HealthStatusPage extends PageInterface implements OnInit {

  userName: string;
  status: any;

  constructor(public translateService: TranslateService,
              private navController: NavController,
              private personalDataService: PersonalDataService,
              private storageService: StorageService) {
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {
    this.userName = this.storageService.personalDataName;
    this.status = this.personalDataService.currentStatus;
  }

  goToApp() {
    this.navController.navigateRoot('main/contact-trace/share');
  }

  showHelp(): void {
    this.navController.navigateForward('personal-data/help', { queryParams: {status: this.status }});
  }

  showBadge(): boolean {
    if (this.status.status.includes('high') || this.status.status.includes('low')) {
      return true;
    }
    return false;
  }

  getIcon(): string {
    if (this.status.status.includes('high')) {
      return 'assets/icon/high_prob.svg';
    } else {
      return 'assets/icon/low_prob.svg';
    }
  }
}
