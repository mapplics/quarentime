import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {ToastHelperService} from '../../shared/helpers/toast-helper.service';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {NavController, Platform} from '@ionic/angular';
import * as firebase from 'firebase';
import {AuthService} from '../../providers/auth.service';
import {LoadingHelperService} from '../../shared/helpers/loading-helper.service';

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
                private navCtrl: NavController,
                private authService: AuthService,
                private loadingCtrl: LoadingHelperService,
                private platform: Platform) {
        super(translateService, english, spanish);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    onLoginFacebook() {
        if (this.platform.is('desktop')) {
            this.goToNextPage();
            return;
        }
        this.loadingCtrl.presentLoading(this.translateService.instant('LOGIN.LOADING'))
            .then(() => {
                // the permissions your facebook app needs from the user
                const permissions = ['public_profile', 'email'];

                this.facebook.login(permissions)
                    .then((res: FacebookLoginResponse) => {
                        const userId = res.authResponse.userID;

                        // armo las credenciales para enviar a firebase
                        const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                        this.loginFirebase(credential, 'facebook');
                        // Getting name and gender properties
                        /* this.facebook.api('/me?fields=name,email,first_name,picture.width(400).height(400).as(picture_large),last_name', permissions)
                            .then(user => {
                                debugger;

                                // this.goToNextPage();
                                // this.toastCtrl.successToast(this.translateService.instant('LOGIN.LOGIN_OK'));
                                // user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
                                // now we have the users info, let's save it in the NativeStorage
                                console.log(user);
                            }
                            */
                    })
                    .catch(e => {
                        console.log('Error logging into Facebook', e);
                        this.loadingCtrl.dismiss();
                    });
            });
    }

    onLoginGoogle() {
        if (this.platform.is('desktop')) {
            this.goToNextPage();
            return;
        }
        this.loadingCtrl.presentLoading(this.translateService.instant('LOGIN.LOADING'))
            .then(() => {
                // https://ionicthemes.com/tutorials/about/ionic-google-login
                this.googlePlus.login({})
                    .then(res => {
                        // armo las credenciales para enviar a firebase
                        const credential = res.accessSecret ? firebase.auth.GoogleAuthProvider
                            .credential(res.accessToken, res.accessSecret) : firebase.auth.GoogleAuthProvider
                            .credential(null, res.accessToken);
                        // login with firebase
                        this.loginFirebase(credential, 'google');

                    })
                    .catch(err => {
                        console.log('Error logging into Google', err);
                        this.loadingCtrl.dismiss();
                    });
            });


    }

    loginFirebase(credential, type) {
        firebase.auth().signInWithCredential(credential)
            .then(success => {
                // guardo la info del usuario en el storage
                this.authService.saveUserLogged(success.user, type);
                this.goToNextPage();
                this.toastCtrl.successToast(this.translateService.instant('LOGIN.LOGIN_OK'));
                console.log('Firebase success: ' + JSON.stringify(success));
                this.loadingCtrl.dismiss();
            })
            .catch(err => {
                this.toastCtrl.errorToast(this.translateService.instant('LOGIN.LOGIN_ERR'));
                console.log('Error firebase ' + type, err);
                this.loadingCtrl.dismiss();
            });

    }

    goToNextPage() {
        this.navCtrl.navigateRoot('onboarding');
    }

}
