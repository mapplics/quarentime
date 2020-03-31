import { Component, OnInit } from '@angular/core';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {TranslateService} from '@ngx-translate/core';
import {PageInterface} from '../../../core/page-interface';
import {StorageService} from '../../../shared/services/storage.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage extends PageInterface implements OnInit {
    slideOpts = {
        slidesPerView: 2,
    };

    userName: string;
    statusColor: string;

    constructor(public translateService: TranslateService,
                private storageService: StorageService) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit() {
        this.userName = this.storageService.personalDataName;
        this.statusColor = this.storageService.userStatusColor;
    }

}
