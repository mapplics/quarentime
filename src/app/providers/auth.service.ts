import {Injectable, NgZone} from '@angular/core';
import {BaseService} from '../core/services/base.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {Facebook} from '@ionic-native/facebook/ngx';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {ToastHelperService} from '../shared/helpers/toast-helper.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    auth: AuthModel;

    constructor(public router: Router,
                private zone: NgZone,
                private facebook: Facebook,
                private googlePlus: GooglePlus) {
        super(router);
    }

    init() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: 'AIzaSyBA3VcHnEWCy-mpShMLTdq1bEMkWsf2oIM',
            authDomain: 'quarentime.firebaseapp.com',
            databaseURL: 'https://quarentime.firebaseio.com',
            projectId: 'quarentime',
            storageBucket: 'quarentime.appspot.com',
            messagingSenderId: '627240942816',
            appId: '1:627240942816:web:c6f1da78976ae13aa2e485',
            measurementId: 'G-1X9SMMCG6D'
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // Emit logged in status whenever auth state changes
        firebase.auth().onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {
                this.auth = new AuthModel();
                this.auth.name = firebaseUser.displayName;
                this.auth.email = firebaseUser.email;
                this.auth.refreshToken = firebaseUser.refreshToken;
                this.auth.photoUrl = firebaseUser.photoURL;
                this.auth.loginType = localStorage.getItem('quarentimeType');
                this.loggedIn.next(true);
            } else {
                this.loggedIn.next(false);
            }
            debugger;
            // firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
            firebaseUser.getIdToken().then((data) => {
                console.log('token1', data);
            });
        });
    }

    saveUserLogged(user, type) {
        /*  el parametro true si esta vencido refresca el token */
        return user.getIdToken(true)
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

    async getTokenRefresh() {
        return await this.getActiveUser().getIdToken(true);
    }
}
