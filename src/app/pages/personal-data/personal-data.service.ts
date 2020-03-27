import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {CountryModel, PersonalDataModel} from './models/personal-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map, take} from 'rxjs/internal/operators';
import { GeneralResponse } from 'src/app/models/general-response.model';
import {QuestionModel} from './models/question.model';
import { AuthService } from 'src/app/providers/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PersonalDataService extends BaseService {

    public _questionAnswers: any;

    constructor(public router: Router,
                private storageService: StorageService,
                private authService: AuthService,
                public http: HttpClient) {
        super(router);
        this._questionAnswers = {
            has_recent_travel_last_14_days: false,
            has_recent_travel_before_symptoms: false,
            has_close_contact: false,
            has_symptoms: false,
            has_recovered: false,
            is_tested_positive: false,
            symptoms: []
        };
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

    private _currentQuestion: QuestionModel;
    get currentQuestion(): QuestionModel {
        return this._currentQuestion;
    }
    set currentQuestion(data) {
        this._currentQuestion = data;
    }

    private _questions: QuestionModel[] = [];
    get questions(): QuestionModel[] {
        return this._questions;
    }
    set questions(data) {
        this._questions = data;
    }

    get currentStatus(): any {
        return JSON.parse(localStorage.getItem('health'));
    }

    set currentStatus(data) {
        localStorage.setItem('health', data);
    }

    // send personal information
    sendPersonalInformation(): Observable<{} | GeneralResponse> {
        debugger;
        const url = `${this._API}User/PersonalInformation`;
        return this.http.post<GeneralResponse>(url, {
            email: this.authService.getEmail(),
            name: this._personalData.name,
            surname: this._personalData.surename,
            age: this._personalData.age,
            phone_number: this._personalData.phone
        })
            .pipe(
                map((res: GeneralResponse) => {
                    this.storageService.storePersonalData(this._personalData);
                    return res;
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
    }

    sendSurvey(): Observable<{} | GeneralResponse> {
        debugger;
        const url = `${this._API}User/Survey`;
        return this.http.post<GeneralResponse>(url, this._questionAnswers)
            .pipe(
                map((res: GeneralResponse) => {
                    this.currentStatus = JSON.stringify(res.result);
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
