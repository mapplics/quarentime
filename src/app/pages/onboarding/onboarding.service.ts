import {Injectable} from '@angular/core';

import {OnboardingModel} from './onboarding.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    private _itemsInformation: OnboardingModel[];


    constructor() {
        this._itemsInformation = [
            new OnboardingModel('Invite family, friends and colleagues.', 'assets/icon/icon-addfriends.png', 'Create your own close contact circle contact trace)'),
            new OnboardingModel('Monitor your symptoms dayly. Share it!', '', 'Are you having cough or difficulty breathing, or feverish? Share it!'),
            new OnboardingModel('Track how your contact circle is feeling.', '', 'Discover if someone of your circle has been tested positive for COVID-19.'),
            new OnboardingModel('Get alerts! You are close to a high risk patients', '', 'Take everyday precautions to keep space bewtween yourself and others.'),
        ];
    }

    get itemsInformationList(): OnboardingModel[] {
        return this._itemsInformation;
    }

}
