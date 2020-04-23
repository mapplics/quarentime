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
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

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
                private firebaseCrashlytics: FirebaseCrashlytics,
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
                        const crashlytics = this.firebaseCrashlytics.initialise();
                        crashlytics.logException('Error logging into facebook ' +  e);
                        this.loadingCtrl.dismiss();
                    });
            });
    }

    onLoginGoogle() {
        if (this.platform.is('mobileweb')) {
            this.goToOnboarding();
            // simulo los datos
            localStorage.setItem('quarentimeToken', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYWJiMjI0NDBkYTAzMmM1ZDAwNDJjZGFhOWQyODVjZjhkMjAyYzQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2VyZ2lvIEdyZWdvcmkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ktRWxWQThIRUl0UXdjbXhkWVRiaGNmV1ltN1ZFdDZaN0NKSFRGT2ciLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVhcmVudGltZS1wcm9kIiwiYXVkIjoicXVhcmVudGltZS1wcm9kIiwiYXV0aF90aW1lIjoxNTg3NDkxMjEzLCJ1c2VyX2lkIjoiVzVoMkdpOWpmQWJ6cWFCaGY4WUVkTmk5dGRDMyIsInN1YiI6Ilc1aDJHaTlqZkFienFhQmhmOFlFZE5pOXRkQzMiLCJpYXQiOjE1ODc1Njk4OTgsImV4cCI6MTU4NzU3MzQ5OCwiZW1haWwiOiJjaGVjaG9ub2JAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDUxNjY0MjAxMDY3MDI5MDg1MTMiXSwiZW1haWwiOlsiY2hlY2hvbm9iQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.bhkEdGaeBOMiEXFC0U-7APKzJyifhZI4Kh858-TzDpgDY85vt9XGp5Lo3evuurHsZPY_SEZUJoY_V_2Am92RZ24fm_PvWGp4ZyTyn2-av_fhoQsgKz1DsT4IScXq_gEfd0iLr3NuMroacASucIhZM-uJkI1dli8X8uvp8ZLyn46BjZA_q3cpFf9ZqpxgnDx7icMryDqSR9K8HjBnuzdACUGSqPPWS8-aBIzEin-Uu7OPJYMyHeR8C-XyuLxohbV_VlxMf5e-It7LKFlp4HTZsrRMBviXvdoQ55cc8WsCioA6TQ2EYufs9qdAj9YO4FGJhcr3yONEsS894_94FQrDzQ");
            localStorage.setItem('quarentimeName', "mocked user");
            localStorage.setItem('quarentimeEmail', "chechonob@gmail.com");
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
                        const crashlytics = this.firebaseCrashlytics.initialise();
                        crashlytics.logException('Error logging into Google ' +  err);
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
                const crashlytics = this.firebaseCrashlytics.initialise();
                crashlytics.logException('Error logging ' + type + ' ' +  err);
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
