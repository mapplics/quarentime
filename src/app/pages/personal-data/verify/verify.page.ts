import {Component, OnInit, ViewChild} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage extends PageInterface implements OnInit {

  form: FormGroup;

  constructor(public translateService: TranslateService,
              private formBuilder: FormBuilder,
              private navController: NavController) {
    super(translateService, english, spanish);
  }

  @ViewChild('input', {static: false}) digit1;

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
    this.navController.navigateRoot('personal-data/questions');
  }

}
