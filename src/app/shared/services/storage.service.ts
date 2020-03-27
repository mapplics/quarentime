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

    get userLanguage(): string {
        return this.getItem('quarentimeUserLanguage');
    }

    private getItem(tag: string): string {
        return localStorage.getItem(tag);
    }
}