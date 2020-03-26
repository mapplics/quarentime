import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';
import { LoadingHelperService } from 'src/app/shared/helpers/loading-helper.service';
import { VerifyService } from '../verify.service';
import { take } from 'rxjs/internal/operators';
import { GeneralResponse } from 'src/app/models/general-response.model';
import { ToastHelperService } from 'src/app/shared/helpers/toast-helper.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage extends PageInterface implements OnInit {

  form: FormGroup;

  constructor(public translateService: TranslateService,
              private formBuilder: FormBuilder,
              private navController: NavController,
              private loadingCtrl: LoadingHelperService,
              private verifyService: VerifyService,
              private toastCtrl: ToastHelperService,
              private toastController: ToastController) {
    super(translateService, english, spanish, macedonian, germany, dutch);
    this.getTranslations('VERIFY.ERRORS');
  }

  async presentToast(head, mess) {
    const toast = await this.toastController.create({
      header: head,
      message: mess,
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'warning-outline'
        }
      ]
    });
    toast.present();
  }

  ngOnInit() {
    this.sendCode();

    this.getTranslations('VERIFY.ERRORS');
    this.form = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
      digit5: ['', [Validators.required, Validators.maxLength(1)]],
      digit6: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.form.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.validateCode();
      }
    });
  }

  resendCode(): void {
    this.sendCode();
  }

  policies(): void {
    // todo
  }

  sendCode() {
    this.verifyService.sendVerifyCode().pipe(
      take(1)
    ).subscribe(
      (response: GeneralResponse) => {
          console.log(response);
        }
      )
  }

  validateCode(): void {
    // todo validation
    let code = `${this.form.value.digit1}${this.form.value.digit2}${this.form.value.digit3}-${this.form.value.digit4}${this.form.value.digit5}${this.form.value.digit6}`;
    this.loadingCtrl.presentLoading(this.translateService.instant('INFO.SENDING'))
      .then(() => {
      this.verifyService.confirmVerifyCode(code).pipe(
        take(1)
      ).subscribe(
        (response: GeneralResponse) => {
          if (response.error) {
            this.presentToast(this.translates.VERIFICATION_FAILED.TITLE, this.translates.VERIFICATION_FAILED.MESSAGE);
            this.form.reset();
          } else {
            this.toastCtrl.successToast(this.translates.VERIFICATION_SUCCESS);          
            this.navController.navigateRoot('personal-data/intake');
          }
          this.loadingCtrl.dismiss();
        }        
      );
    }); 
  }
}
