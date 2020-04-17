import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {ModalController} from '@ionic/angular';
import {PoliciesModalComponent} from './policies-modal/policies-modal.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent extends PageInterface implements OnInit {

  constructor(public translateService: TranslateService,
              private modalController: ModalController) {
    super(translateService, english, spanish, macedonian, germany, dutch);
  }

  ngOnInit() {}


  async policies() {
    const modal = await this.modalController.create({
      component: PoliciesModalComponent
    });
    return await modal.present();
  }
}
