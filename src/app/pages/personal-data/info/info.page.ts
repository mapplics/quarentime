import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage extends PageInterface implements OnInit {

  form: FormGroup;

  constructor(public translateService: TranslateService,
              private formBuilder: FormBuilder,
              private navController: NavController) {
    super(translateService, english, spanish);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surename: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(17)]],
      country: ['', Validators.required]
    });

    this.form.statusChanges.subscribe(
        (status) => {
          if (status === 'VALID') {
            // TODO ver como esperar q termine de ingresar.. escuchar un lost focus
            this.navController.navigateRoot('personal-data/verify');
          }
        }
    );
  }

  policies(): void {
    // todo
  }
}
