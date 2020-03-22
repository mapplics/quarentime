import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {ToastHelperService} from '../../shared/helpers/toast-helper.service';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage extends PageInterface implements OnInit {

    constructor(public translateService: TranslateService,
                private facebook: Facebook,
                private toastCtrl: ToastHelperService,
                private googlePlus: GooglePlus,
                private navCtrl: NavController) {
        super(translateService, english, spanish);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onLoginFacebook() {
        // the permissions your facebook app needs from the user
        const permissions = ['public_profile', 'email'];

        this.facebook.login(permissions)
            .then((res: FacebookLoginResponse) => {
                const userId = res.authResponse.userID;
                // Getting name and gender properties
                this.facebook.api('/me?fields=name,email,first_name,picture.width(400).height(400).as(picture_large),last_name', permissions)
                    .then(user => {
                        this.goToNextPage();
                        this.toastCtrl.successToast(this.translateService.instant('LOGIN.LOGIN_OK'));
                        // user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                        // now we have the users info, let's save it in the NativeStorage
                        console.log(user);
                    });
            })
            .catch(e => {
                console.log('Error logging into Facebook', e);
            });

    }

    onLoginGoogle() {
        // https://ionicthemes.com/tutorials/about/ionic-google-login
        this.googlePlus.login({})
            .then(res => {
                this.goToNextPage();
                this.toastCtrl.successToast(this.translateService.instant('LOGIN.LOGIN_OK'));
            })
            .catch(err => {
                console.log('Error logging into Google', err);
            });

    }

    goToNextPage() {
        this.navCtrl.navigateRoot('personal-data');
    }

}
