import { Injectable } from '@angular/core';
import { PersonalDataModel } from 'src/app/pages/personal-data/models/personal-data.model';


@Injectable({
    providedIn: 'root'
})
export class StorageService {


    storePersonalData(personalData: PersonalDataModel) {
        localStorage.setItem('quarentimeDataName', personalData.name);
        localStorage.setItem('quarentimeDataSurname', personalData.surename);
        localStorage.setItem('quarentimeDataAge', personalData.age.toString());
        localStorage.setItem('quarentimeDataCountryTag', personalData.country.tag);
        localStorage.setItem('quarentimeDataPhone', personalData.phone);
    }

    storeUserLanguage(language: string) {
        localStorage.setItem('quarentimeUserLanguage', language);
    }

    get personalDataName(): string {
        return this.getItem('quarentimeDataName');
    }

    get personalDataSurName(): string {
        return this.getItem('quarentimeDataSurname');
    }

    get userLanguage(): string {
        return this.getItem('quarentimeUserLanguage');
    }

    get userStatusColor(): string {
        return JSON.parse(this.getItem('health')).color_hex;
    }

    get userStatus(): string {
        return JSON.parse(this.getItem('health')).status;
    }

    private getItem(tag: string): string {
        return localStorage.getItem(tag);
    }

    get nameInitialWord(){
        return this.personalDataName.charAt(0).toUpperCase() + this.personalDataSurName.charAt(0).toUpperCase();
    }
}
