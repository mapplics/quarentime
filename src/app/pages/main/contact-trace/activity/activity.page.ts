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
import {AlertController, ModalController} from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import {forkJoin} from 'rxjs';
import {ModalAcceptComponent} from './modal-accept/modal-accept.component';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.page.html',
    styleUrls: ['./activity.page.scss'],
})
export class ActivityPage extends PageInterface implements OnInit {

    contactList: ContactModel[];
    date = new Date();

    constructor(public translateService: TranslateService,
                private loadingController: LoadingHelperService,
                private contactTraceService: ContactTraceService,
                private authService: AuthService,
                private alertController: AlertController,
                private modalController: ModalController) {
        super(translateService, english, spanish);
        this.getTranslations('ACTIVITY');
    }

    ngOnInit() {
        this.getContacts();
    }

    async presentConfirmDelete(contact: ContactModel) {
        const alert = await this.alertController.create({
            header: this.translates.ALERT_DELETE.HEADER,
            buttons: [
                {
                    text: this.translates.ALERT_DELETE.NO,
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: this.translates.ALERT_DELETE.YES,
                    cssClass: 'primary',
                    handler: () => {
                        this.ignoreContact(contact);
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentModalAccept() {
        const modal = await this.modalController.create({
            component: ModalAcceptComponent,
            showBackdrop: true,
            backdropDismiss: false,
            cssClass: 'small'
        });
        return await modal.present();
    }

    getContacts(): void {
        const pendingsObs = this.contactTraceService.getPendingRequest();
        const contactsObs = this.contactTraceService.getContacts();
        this.loadingController.presentLoading(this.translates.RETRIEVING).then(() => {
            this.authService.refreshToken().then(() => {
                forkJoin([pendingsObs, contactsObs]).pipe(take(1))
                    .subscribe((resp: any) => {
                        this.contactList = resp[0].result.concat(resp[1].result);
                        // this.groupByMonth();
                        this.loadingController.dismiss();
                    }, () => {
                        // todo error
                        this.loadingController.dismiss();
                    });
            });
        });
    }

    groupByMonth(): void {
        const groups = this.contactList.reduce((groupList, contact) => {
            const date = contact.dateAdded;
            if (!groupList[date.toDateString()]) {
                groupList[date.toDateString()] = [];
            }
            groupList[date.toDateString()].push(contact);
            return groupList;
        }, {});

// Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                contacts: groups[date]
            };
        });

    }

    confirmContact(contact: ContactModel): void {
        this.loadingController.presentLoading(this.translates.SEND).then(() => {
            this.contactTraceService.acceptInvite(contact.inviteId).pipe(take(1))
                .subscribe((resp: GeneralResponse) => {
                    this.loadingController.dismiss();
                    // this.presentModalAccept().then(() => {
                    //     this.updateContactStatus(contact);
                    // });
                    this.updateContactStatus(contact);
                }, () => {
                    // todo
                    this.loadingController.dismiss();
                });
        });
    }


    ignoreContact(contact: ContactModel): void {
        this.loadingController.presentLoading(this.translates.SEND).then(() => {
            this.contactTraceService.rejectInvite(contact.inviteId).pipe(take(1))
                .subscribe((resp: GeneralResponse) => {
                    this.loadingController.dismiss();
                    // si lo ignora refresco el listado                    
                    this.getContacts();
                }, () => {
                    // todo
                    this.loadingController.dismiss();
                });
        });
    }

    updateContactStatus(contact: ContactModel) {
        contact.pending = false;
    }
}
