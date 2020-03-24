import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {NavController, Platform} from '@ionic/angular';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';

@Component({
    selector: 'app-share',
    templateUrl: './share.page.html',
    styleUrls: ['./share.page.scss'],
})
export class SharePage extends PageInterface implements OnInit {

    constructor(public translateService: TranslateService,
                private navCtrl: NavController) {
        super(translateService, english, spanish);
    }

    ngOnInit() {
    }

    onInvite() {

    }

    onShare() {
        
    }

}
