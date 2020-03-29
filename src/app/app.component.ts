import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './providers/auth.service';
import {Router} from '@angular/router';
import {PersonalDataService} from './pages/personal-data/personal-data.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import { StorageService } from './shared/services/storage.service';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private storageService: StorageService,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router,
        private dataService: PersonalDataService,
        private globalization: Globalization,
        private translateService: TranslateService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.authService.init();
        this.platform.ready().then(() => {
            this.dataService.loadData();
            this.globalization.getPreferredLanguage()
                .then((res) => {
                    const lang = res.value.split('-')[0];
                    this.storageService.storeUserLanguage(lang);
                    if (this.canChangeLang(lang)) {
                        this.translateService.use(lang);
                    }
                })
                .catch(e => console.log(e));

            if (this.platform.is('ios')) {
                this.statusBar.styleDefault();
            }
            this.authService.loggedIn.subscribe(state => {
                if (!state) {
                    // this.router.navigateByUrl('onboarding');
                }
            });
        });
    }

    canChangeLang(lang): boolean {
        return environment.availableLangs.includes(lang);
    }
}
