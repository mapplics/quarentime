import {Injectable, NgZone} from '@angular/core';
import {BaseService} from '../core/services/base.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {Facebook} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {ToastHelperService} from '../shared/helpers/toast-helper.service';
import { promise } from 'protractor';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    auth: AuthModel;

    constructor(public router: Router,
                private platform: Platform,
                private zone: NgZone,
                private facebook: Facebook,
                private googlePlus: GooglePlus) {
        super(router);
    }

    init() {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: environment.firebase_apiKey,
            authDomain: environment.firebase_authDomain,
            databaseURL: environment.firebase_databaseURL,
            projectId: environment.firebase_projectId,
            storageBucket: environment.firebase_storageBucket,
            messagingSenderId: environment.firebase_messagingSenderId,
            appId: environment.firebase_appId,
            measurementId: environment.firebase_measurementId
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // Emit logged in status whenever auth state changes
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.auth = new AuthModel();
                this.auth.name = firebaseUser.displayName;
                this.auth.email = firebaseUser.email;
                localStorage.setItem('quarentimeEmail', firebaseUser.email);
                this.auth.refreshToken = firebaseUser.refreshToken;
                this.auth.photoUrl = firebaseUser.photoURL;
                this.auth.loginType = localStorage.getItem('quarentimeType');
                this.loggedIn.next(true);
                this.getTokenRefresh()
            } else {
                this.loggedIn.next(false);
            }

            /*
             firebaseUser.getIdToken().then((data) => {
                 console.log('token1', data);
             });
             */
        });

        // firebase.auth().onIdTokenChanged(firebaseUser => {
        //     debugger;

        // })
    }

    saveUserLogged(user, type, refresh = false) {
        /*  el parametro true si esta vencido refresca el token */
        return user.getIdToken(refresh)
            .then((token) => {
                console.log('token2', token);
                localStorage.setItem('quarentimeToken', token);
                localStorage.setItem('quarentimeName', user.displayName);
                localStorage.setItem('quarentimeRefreshToken', user.refreshToken);
                localStorage.setItem('quarentimeType', type); // logeado pro gamil o facebook
            });
    }

    async logout(): Promise<void> {
        const type = localStorage.getItem('quarentimeType');
        try {
            if (type === 'facebook') {
                await this.facebook.logout(); // Unauth with Facebook
            } else if (type === 'google') {
                await this.googlePlus.logout();
            }
            await firebase.auth().signOut(); // Unauth with Firebase
        } catch (err) {
            console.log(err);
        }
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }

    getToken(): string {
        return 'Bearer ' + localStorage.getItem('quarentimeToken');
    }

    getEmail(): string {
        return localStorage.getItem('quarentimeEmail');
    }

    refreshToken(): Promise<string> {
        if (this.platform.is('mobileweb')) {
            return Promise.resolve('done');
        }
       return this.getActiveUser().getIdToken(false).then(
            (newToken) => {
                console.log('token-new', newToken);
                localStorage.setItem('quarentimeToken', newToken);
                return newToken;
            }
        );
    }

    async getTokenRefresh() {
        return await this.getActiveUser().getIdToken(false);
    }

    get isAuthenticated() {
        // si hay token esta ok, y lo mando a refresacar
        if (this.getEmail()) {
            // refresco el token por las dudas
            return true;
        } else {
            return false;
        }
    }

    get isFirebaseReady(): boolean {
        return (this.getActiveUser() !== null);
    }

    getLocale(): string {
       return localStorage.getItem('quarentimeUserLanguage');
    }
}
