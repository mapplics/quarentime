import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {Facebook} from '@ionic-native/facebook/ngx';
import {GooglePlus } from '@ionic-native/google-plus/ngx';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Globalization} from '@ionic-native/globalization/ngx';
import {Contacts} from '@ionic-native/contacts/ngx';
import {AuthService} from './providers/auth.service';
import { registerLocaleData } from '@angular/common';
import localeSpanish from '@angular/common/locales/es';
import localeEnglish from '@angular/common/locales/en';
import localeGermany from '@angular/common/locales/de';
import localeDutch from '@angular/common/locales/nl';
import localeMacedonia from '@angular/common/locales/mk';
import {PoliciesModule} from './shared/component/policies/policies.module';
// import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';

registerLocaleData(localeSpanish, 'es');
registerLocaleData(localeEnglish, 'en');
registerLocaleData(localeGermany, 'de');
registerLocaleData(localeDutch, 'nl');
registerLocaleData(localeMacedonia, 'mk');

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        PoliciesModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Facebook,
        GooglePlus,
        SocialSharing,
        Globalization,
        Contacts,
        // FirebaseCrashlytics,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {
            provide: LOCALE_ID,
            deps: [AuthService],
            useFactory: (authService) => authService.getLocale()
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
