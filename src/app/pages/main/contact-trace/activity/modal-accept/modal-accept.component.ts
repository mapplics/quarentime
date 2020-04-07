import { Component, OnInit } from '@angular/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {PageInterface} from '../../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-accept',
  templateUrl: './modal-accept.component.html',
  styleUrls: ['./modal-accept.component.scss'],
})
export class ModalAcceptComponent extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private modalController: ModalController) {
    super(translateService, english, spanish);
  }

  ngOnInit() {}

  save(): void {
    this.modalController.dismiss();
  }

}
