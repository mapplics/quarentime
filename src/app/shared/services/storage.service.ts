import { Injectable } from '@angular/core';
import { PersonalDataModel } from 'src/app/pages/personal-data/models/personal-data.model';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private getItem(tag: string): string {
        return localStorage.getItem(tag);
    }

    storePersonalData(personalData: PersonalDataModel) {
        localStorage.setItem('quarentimeDataName', personalData.name);
        localStorage.setItem('quarentimeDataSurname', personalData.surename);
        localStorage.setItem('quarentimeDataAge', personalData.age.toString());
        // localStorage.setItem('quarentimeDataCountryTag', personalData.country.tag);
        localStorage.setItem('quarentimeDataPhone', personalData.phone);
    }

    storeUserLanguage(language: string) {
        localStorage.setItem('quarentimeUserLanguage', language);
    }

    updateUserStatus(status: string, statusColor: string) {
        const current = this.getItem('health') ? JSON.parse(this.getItem('health')) : null;        
        if (current) {
            current.status = status;
            current.color_hex = statusColor;
            localStorage.setItem('health', JSON.stringify(current));
        }
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
        return this.getItem('health') ? JSON.parse(this.getItem('health')).status : null;
    }    

    get nameInitialWord() {
        return this.personalDataName.charAt(0).toUpperCase() + this.personalDataSurName.charAt(0).toUpperCase();
    }

    get appVerified(): boolean {
        if (this.getItem('codeVerified')) {
            return (this.getItem('codeVerified') === '1');
        } else {
            return false;
        }
    }
}
