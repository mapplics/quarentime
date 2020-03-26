import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {CountryModel, PersonalDataModel} from './models/personal-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map, take} from 'rxjs/internal/operators';
import { GeneralResponse } from 'src/app/models/general-response.model';
import {QuestionModel} from './models/question.model';

@Injectable({
    providedIn: 'root'
})
export class PersonalDataService extends BaseService {

    constructor(public router: Router,
                public http: HttpClient) {
        super(router);
    }

    private _personalData: PersonalDataModel;
    get personalData(): PersonalDataModel {
        return this._personalData;
    }

    set personalData(data) {
        this._personalData = data;
    }

    private _countries: CountryModel[] = [];
    get countries(): CountryModel[] {
        return this._countries;
    }
    set countries(data) {
        this._countries = data;
    }

    private _questions: QuestionModel[] = [];
    get questions(): QuestionModel[] {
        return this._questions;
    }
    set questions(data) {
        this._questions = data;
    }

    // send personal information
    sendPersonalInformation(): Observable<{} | GeneralResponse> {
        const url = `${this._API}User/PersonalInformation`;
        // todo ver!!!
        debugger;
        return this.http.post<GeneralResponse>(url, {
            email: "a@aa.com",
            name: this._personalData.name,
            surname: this._personalData.surename,
            age: this._personalData.age,
            phoneNumber: this._personalData.phone
        })
            .pipe(
                map((res: GeneralResponse) => {
                    debugger;
                    return res;
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
    }

    loadData() {
        this.getCountries().pipe(take(1)).subscribe(
            (data: CountryModel[]) => {
                this.countries = data;
            });

        this.getQuestions().pipe(take(1)).subscribe(
            (data: QuestionModel[]) => {
                this.questions = data;
            });
    }

    private getCountries(): Observable<any> {
        const url = 'assets/data/countries.json';
        return this.http.get<any>(url)
            .pipe(
                map(res => {
                    return CountryModel.createFromObjectCollection(res);
                })
            );
    }

    private getQuestions(): Observable<any> {
        const url = 'assets/data/questions.json';
        return this.http.get<any>(url)
            .pipe(
                map(res => {
                    return QuestionModel.createFromObjectCollection(res);
                })
            );
    }

}
