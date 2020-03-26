import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, ToastController} from '@ionic/angular';

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
              private toastController: ToastController) {
    super(translateService, english, spanish);
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
    // todo
  }

  policies(): void {
    // todo
  }

  validateCode(): void {
    // todo validation
    this.form.reset();
    this.presentToast(this.translates.VERIFICATION_FAILED.TITLE, this.translates.VERIFICATION_FAILED.MESSAGE);
//    localStorage.setItem('codeVerified', '1');
    this.navController.navigateRoot('personal-data/intake');
  }

}
