import {Component, OnInit} from '@angular/core';
import {PageInterface} from '../../core/page-interface';
import {TranslateService} from '@ngx-translate/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

import {locale as english} from './i18n/en';
import {locale as spanish} from './i18n/es';
import {locale as macedonian} from './i18n/mk';
import {locale as germany} from './i18n/de';
import {locale as dutch} from './i18n/nl';
import {ToastHelperService} from '../../shared/helpers/toast-helper.service';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {NavController, Platform} from '@ionic/angular';
import * as firebase from 'firebase';
import {AuthService} from '../../providers/auth.service';
import {LoadingHelperService} from '../../shared/helpers/loading-helper.service';
import {StorageService} from '../../shared/services/storage.service';

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
                private platform: Platform,
                private storageService: StorageService) {
        super(translateService, english, spanish, macedonian, germany, dutch);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (this.authService.isAuthenticated) {
            if (this.storageService.appVerified) {
                this.goToMainPage();
            } else {
                this.goToPersonalData();
            }
        }
    }

    onLoginFacebook() {
        if (this.platform.is('mobileweb')) {
            this.goToOnboarding();
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
                    })
                    .catch(e => {
                        this.toastCtrl.errorToast(this.translateService.instant('LOGIN.LOGIN_ERR'));
                        console.log('Error logging into Facebook', e);
                        this.loadingCtrl.dismiss();
                    });
            });
    }

    onLoginGoogle() {
        if (this.platform.is('mobileweb')) {
            this.goToOnboarding();
            // simulo los datos
            localStorage.setItem('quarentimeToken', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYTczOGUyMWI5MWNlMjRmNDM0ODBmZTZmZWU0MjU4Yzg0ZGI0YzUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2VyZ2lvIEdyZWdvcmkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ktRWxWQThIRUl0UXdjbXhkWVRiaGNmV1ltN1ZFdDZaN0NKSFRGT2c9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVhcmVudGltZSIsImF1ZCI6InF1YXJlbnRpbWUiLCJhdXRoX3RpbWUiOjE1ODU2NDgzMTUsInVzZXJfaWQiOiJQeE5Nb1lUNHBoYXM0WXFvRVlXTXlMUGU1ckgzIiwic3ViIjoiUHhOTW9ZVDRwaGFzNFlxb0VZV015TFBlNXJIMyIsImlhdCI6MTU4NTY0ODUzOCwiZXhwIjoxNTg1NjUyMTM4LCJlbWFpbCI6ImNoZWNob25vYkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNTE2NjQyMDEwNjcwMjkwODUxMyJdLCJlbWFpbCI6WyJjaGVjaG9ub2JAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.d9b5q2UIn0yMwn4YJIO2N0hp_YdytsjqmCrFdcmPLzgMLwfl-fANQMoylNJXb0EqK7-3EJ38xzAMOeaPKJ0IFmbCpPQ6ynqFoII7W5N8rXoSK-34sJXRxXY5LecPtb0yWET8aIYZg4Ftn-44kvubo-UGwIYoBO0Eiqwpk6z_XF7_dR47eQ7oCJlCaHwWjWABUhIvwhLCwYK5xPHqFSNCYdd1zqR_2Hp6NE0A51U8YmoVb9Rc4NHXjreF95pMtykCs8VQapInhzVKv-1A4mEuYfBM8TRcgHE3FxyhR7fTgv73sA86hgRUdmWpM_13R-tKNP4YEbRw1wmN0HkoiyuRGw");
            localStorage.setItem('quarentimeName', "mocked user");
            localStorage.setItem('quarentimeRefreshToken', "refresh");
            localStorage.setItem('quarentimeType', "google"); // logeado pro gamil o facebook
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
                        this.toastCtrl.errorToast(this.translateService.instant('LOGIN.LOGIN_ERR'));
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
                this.goToOnboarding();
                // this.toastCtrl.successToast(this.translateService.instant('LOGIN.LOGIN_OK'));
                console.log('Firebase success: ' + JSON.stringify(success));
                this.loadingCtrl.dismiss();
            })
            .catch(err => {
                this.toastCtrl.errorToast(this.translateService.instant('LOGIN.LOGIN_ERR'));
                console.log('Error firebase ' + type, err);
                this.loadingCtrl.dismiss();
            });

    }

    goToOnboarding() {
        this.navCtrl.navigateRoot('onboarding');
    }
    goToPersonalData() {
        this.navCtrl.navigateRoot('personal-data');
    }
    goToMainPage() {
        this.navCtrl.navigateRoot('main');
    }

}
