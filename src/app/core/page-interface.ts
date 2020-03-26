import {OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject, Subscription} from 'rxjs';

export interface Locale {
    lang: string;
    data: Object;
}

export class PageInterface implements OnInit, OnDestroy {

    currentLanguage = '';
    langChangeSubscription: Subscription;
    translates: any;

    public componentDestroyed = new Subject();

    constructor(public translateService: TranslateService,
                ...translations) {
        this.loadTranslations(...translations);
        if (this.translateService.currentLang) {
            this.currentLanguage = this.translateService.currentLang;
        } else {
            this.currentLanguage = 'en';
            this.translateService.use(this.currentLanguage);
        }
    }

    ngOnInit(): void {
        this.langChangeSubscription = this.translateService.onLangChange.subscribe(
            () => {
                this.currentLanguage = this.translateService.currentLang;
                this.loadTranslations();
            });
    }

    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this.translateService.setTranslation(locale.lang, locale.data, true);
        });
    }

    getTranslations(key: string): void {
        this.translateService.get(key)
            .subscribe((data) => {
                this.translates = data;
            });
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    }
}
