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
        const url = `${this._API}User/VerifyPhone`;
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

    // send personal information
    confirmVerifyCode(code: string): Observable<{} | GeneralResponse> {
        const url = `${this._API}User/ConfirmVerificationCode`;
        return this.http.post<GeneralResponse>(url, {"code": code})
            .pipe(
                map((res: GeneralResponse) => {
                    if (res.result) {
                        this.setUserVerified();                  
                    } else {
                        res.error = true;                                                
                    }
                    return res;
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
    }

    get isVerifiedUser(): boolean {
        if (localStorage.getItem('codeVerified')) {
            return true;
        } else {
            return false;
        }
    }

    setUserVerified() {
        localStorage.setItem('codeVerified', '1');
    }

    

}
