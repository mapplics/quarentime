import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {NavController} from '@ionic/angular';
import {LoadingHelperService} from '../../../../shared/helpers/loading-helper.service';
import {PersonalDataService} from '../../personal-data.service';
import {take} from 'rxjs/operators';
import {ToastHelperService} from '../../../../shared/helpers/toast-helper.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-confirm-info',
  templateUrl: './confirm-info.page.html',
  styleUrls: ['./confirm-info.page.scss'],
})
export class ConfirmInfoPage extends PageInterface implements OnInit {

  checkboxes = [false, false];

  constructor(public translateService: TranslateService,
              private navController: NavController,
              private loadingController: LoadingHelperService,
              private personalDataService: PersonalDataService,
              private authService: AuthService,
              private toastService: ToastHelperService) {
    super(translateService, english, spanish, macedonian, germany, dutch);
    this.getTranslations('CONFIRM');
  }

  ngOnInit() {
  }

  next(): void {
    this.loadingController.presentLoading(this.translates.LOADING).then(() => {
      this.authService.refreshToken().then(() => {    
        this.personalDataService.sendSurvey().pipe(take(1))
            .subscribe((resp) => {
              this.loadingController.dismiss();
              this.navController.navigateRoot('personal-data/health-status');
            }, (err) => {
              this.toastService.errorToast(err.message);
              this.loadingController.dismiss();
              // lo dejo pasar por ahora porq es problema del back
              this.navController.navigateRoot('personal-data/health-status');
            });
          });    
    });
  }

  terms(): void {

  }

  policies(): void {

  }

  get btnAvailable(): boolean {
    return this.checkboxes.filter(x => x === false).length === 0;
  }
}
