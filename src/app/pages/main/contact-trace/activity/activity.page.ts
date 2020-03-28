import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {LoadingHelperService} from '../../../../shared/helpers/loading-helper.service';
import {ContactTraceService} from '../../contact-trace.service';
import {take} from 'rxjs/operators';
import {GeneralResponse} from '../../../../models/general-response.model';
import {ContactModel} from '../models/contact.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage extends PageInterface implements OnInit {

  contactList: ContactModel[];

  constructor(public translateService: TranslateService,
              private loadingController: LoadingHelperService,
              private contactTraceService: ContactTraceService) {
    super(translateService, english, spanish);
    this.getTranslations('ACTIVITY');
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.loadingController.presentLoading(this.translates.RETRIEVING).then(() => {
      this.contactTraceService.getContacts().pipe(take(1))
          .subscribe((resp: GeneralResponse) => {
            debugger;
            this.contactList = resp.result;
            this.loadingController.dismiss();
          }, () => {
            // todo error
            this.loadingController.dismiss();
          });
    });
  }

  groupByMonth():void {

  }
  
  confirmContact(contact: ContactModel): void {
    this.loadingController.presentLoading(this.translates.SEND).then(() => {
      this.contactTraceService.acceptInvite(contact.userId).pipe(take(1))
          .subscribe((resp: GeneralResponse) => {
            debugger;
            this.loadingController.dismiss();
          }, () => {
            // todo
            this.loadingController.dismiss();

          });
    });
  }

  ignoreContact(contact: ContactModel): void {
    this.loadingController.presentLoading(this.translates.SEND).then(() => {
      this.contactTraceService.rejectInvite(contact.userId).pipe(take(1))
          .subscribe((resp: GeneralResponse) => {
            debugger;
            this.loadingController.dismiss();
          }, () => {
            // todo
            this.loadingController.dismiss();
          });
    });
  }
}
