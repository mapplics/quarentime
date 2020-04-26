import { Component, OnInit } from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {ContactFieldType, Contacts, IContactFindOptions} from '@ionic-native/contacts/ngx';
import {LoadingHelperService} from '../../../shared/helpers/loading-helper.service';
import {NavController} from '@ionic/angular';
import {take, takeUntil} from 'rxjs/operators';
import {ToastHelperService} from '../../../shared/helpers/toast-helper.service';
import {GeneralResponse} from '../../../models/general-response.model';
import {ContactTraceService} from '../contact-trace.service';
import { AuthService } from 'src/app/providers/auth.service';
import {ContactPhoneModel} from './models/contact-phone.model';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

@Component({
    selector: 'app-invite',
    templateUrl: './invite.page.html',
    styleUrls: ['./invite.page.scss'],
})
export class InvitePage extends PageInterface implements OnInit {

    contactList: any[];
    type: ContactFieldType[] = ['displayName', 'phoneNumbers'];
    options: IContactFindOptions;
    filteredList: any[];
    selectedContacts: any[] = [];
    loading: boolean = false;
    regex = /^\+[1-9 -]+\d{1,14}$/;

    constructor(public translateService: TranslateService,
                private contacts: Contacts,
                private loadingController: LoadingHelperService,
                private navController: NavController,
                private contactTraceService: ContactTraceService,
                private authService: AuthService,
                public firebaseCrashlytics: FirebaseCrashlytics,
                private toastController: ToastHelperService) {
        super(translateService, english, spanish, macedonian, germany, dutch);
        this.getTranslations('INVITE');
    }

    ngOnInit() {
        this.getAllContacts();
    }

    getAllContacts() {
        this.options = {
            filter: '',
            multiple: true,
            desiredFields: ['displayName', 'phoneNumbers'],
            hasPhoneNumber: true
        };
        this.loadingController.presentLoading(this.translates.LOADING).then(() => {
            this.contacts.find(this.type, this.options).then((data) => {
                this.contactList = data;
                this.contactList = this.contactList.filter(x => (x.phoneNumbers && x.phoneNumbers.length > 0 && !!x.displayName && x.phoneNumbers[0].value.match(this.regex)));
                this.filteredList = this.contactList;
                this.sort(this.filteredList);
                this.loadingController.dismiss();
            }).catch((err) => {
                const crashlytics = this.firebaseCrashlytics.initialise();
                crashlytics.logException('Error getting contacts ' +  err);
                this.loadingController.dismiss();
                this.navController.pop();                
            });
        });
    }

    doRefresh(event) {
        this.options = {
            filter: '',
            multiple: true,
            desiredFields: ['displayName', 'phoneNumbers'],
            hasPhoneNumber: true
        };
        this.contacts.find(this.type, this.options).then((data) => {
            this.contactList = data;
            this.contactList = this.contactList.filter(x => (x.phoneNumbers && x.phoneNumbers.length > 0 && !!x.displayName && x.phoneNumbers[0].value.match(this.regex)));
            this.filteredList = this.contactList;
            this.sort(this.filteredList);
            event.target.complete();
        }).catch((err) => {
            const crashlytics = this.firebaseCrashlytics.initialise();
            crashlytics.logException('Error refreshing contacts ' +  err);
            this.navController.pop();
        });

    }

    onKeyUp(event) {
        this.filter(event.target.value);
    }

    onClear(ev): void {
        this.filter('');
    }

    filter(query: string) {
        if (query.length >= 3 || query.length === 0) {
            this.loading = true;
            this.filteredList = this.contactList.filter(x => x.displayName.toLowerCase().includes(query.toLowerCase()));
            this.getContent().scrollToTop(500);
            this.loading = false;
        }
    }

    getContent() {
        return document.querySelector('ion-content');
    }

    selectedChange(event, item) {
        item.selected = event.detail.checked;
        if (event.detail.checked) {
            this.selectedContacts.push(item);
        } else {
            if (this.selectedContacts.indexOf(item) !== -1) {
                this.selectedContacts.splice(this.selectedContacts.indexOf(item), 1);
            }
        }
    }

    delete(item) {
        item.selected = false;
        this.selectedContacts.splice(this.selectedContacts.indexOf(item), 1);
    }

    sendInvite(): void {
        const list = ContactPhoneModel.createFromObjectCollection(this.selectedContacts);
        list.forEach(x => x.phone_number = x.phone_number.replace(/[- ]/g, ''));
        this.loadingController.presentLoading(this.translates.SENDING_INVITE).then(() => {
            this.authService.refreshToken().then(() => {
            this.contactTraceService.sendInvite(list).pipe(takeUntil(this.componentDestroyed)).subscribe(
                (resp: GeneralResponse) => {
                    this.loadingController.dismiss();
                    this.navController.navigateRoot('main/congratulation');
                }, (err) => {
                    this.loadingController.dismiss();
                    this.toastController.errorToast(err.message);
                });
            });
        });

    }

    sort(list): void {
        list.sort((a, b) => {
            const nameA = a.displayName.toUpperCase();
            const nameB = b.displayName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }
}
