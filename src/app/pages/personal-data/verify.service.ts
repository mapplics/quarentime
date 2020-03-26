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

@Injectable({
    providedIn: 'root'
})
export class VerifyService extends BaseService {

    constructor(public router: Router,
                private authService: AuthService,
                public http: HttpClient) {
        super(router);
    }

    // send personal information
    sendVerifyCode(): Observable<{} | GeneralResponse> {
        const url = `${this._API}User//User/VerifyPhone`;
        return this.http.post<GeneralResponse>(url, null)
            .pipe(
                map((res: GeneralResponse) => {
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
