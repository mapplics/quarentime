import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';
import {GeneralResponse} from '../general-response.model';


@Injectable()
export class BaseService {

    public _API = environment.api;
    public _HEADERS = new HttpHeaders();

    constructor(public router: Router) {
        this._HEADERS.set('Accept', 'application/json')
            .append('Access-Control-Allow-Origin', '*')
            .append('Content-type', 'application/json')
            .append('X-Requested-With', 'XMLHttpRequest');

    }

    getToken(): string {
        return 'Basic ' + localStorage.getItem('token');
    }

    public handleError(error: HttpErrorResponse | any): any {
        const response = new GeneralResponse();
        response.data = [];
        response.error = true;

        if (error.error) {
            response.message = error.error.message;

            if (error.error.httpCode === 401) {
                this.router.navigate(['/login']);
            }

            if (error.error.errors) {

                const arrayErrors = Object.keys(error.error.errors).map(i => error.error.errors[i]);
                for (const err of arrayErrors) {
                    response.data.push(err);
                }
            }
        }

        if (response.message === '') {
            // todo make general error message multilanguage
            response.message = '';
        }
        return throwError(response);
    }
}
