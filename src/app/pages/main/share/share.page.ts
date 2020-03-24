import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {NavController, Platform} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {ToastHelperService} from '../../../shared/helpers/toast-helper.service';

@Component({
    selector: 'app-share',
    templateUrl: './share.page.html',
    styleUrls: ['./share.page.scss'],
})
export class SharePage extends PageInterface implements OnInit {

    constructor(public translateService: TranslateService,
                private navCtrl: NavController,
                private socialSharing: SocialSharing,
                private toastCtrl: ToastHelperService) {
        super(translateService, english, spanish);
    }

    ngOnInit() {
    }

    onInvite() {

    }

    onShare() {
        // Check if sharing via email is supported
        this.socialSharing.share(null, null, null, 'quarentime.org').then(() => {
            // Sharing via email is possible
            console.log('compartido');
        }).catch(() => {
            // Sharing via email is not possible
            this.toastCtrl.errorToast(this.translateService.instant('CONTACT.SHARE_ERROR'));
        });
    }

    showInfo() {

    }
}
