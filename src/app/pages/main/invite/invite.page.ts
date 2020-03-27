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

    constructor(public translateService: TranslateService,
                private contacts: Contacts,
                private loadingController: LoadingHelperService,
                private navController: NavController) {
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
                this.contactList = this.contactList.filter(x => (x.phoneNumbers && x.phoneNumbers.length > 0 && !!x.displayName));
                this.filteredList = this.contactList;
                this.sort(this.filteredList);
                this.loadingController.dismiss();
            }).catch((err) => {
                alert(err);
                this.loadingController.dismiss();
            });
        });
    }

    onKeyUp(event) {
        this.filter(event.target.value);
    }

    onClear(ev): void {
        this.filter('');
    }

    filter(query: string) {
        this.filteredList = this.contactList.filter(x => x.displayName.includes(query) );
    }

    selectedChange(event, item) {
        if (event.detail.checked) {
            this.selectedContacts.push(item);
        } else {
            this.selectedContacts.splice(this.selectedContacts.indexOf(item), 1);
        }
    }

    delete(item) {
        this.selectedContacts.splice(this.selectedContacts.indexOf(item), 1);
    }

    sendInvite(): void {
        // todo
        this.navController.navigateRoot('congratulation');
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
