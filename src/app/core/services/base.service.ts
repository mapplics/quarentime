import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';
import { GeneralResponse } from 'src/app/models/general-response.model';



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
    public handleError(error: HttpErrorResponse | any): any {
        debugger;
        const response = new GeneralResponse();
        response.result = [];
        response.error = true;

        if (error.status === 401) {
            this.router.navigate(['/login']);
        } else if (error.status === 500) {
            response.message = `${error.name}: ${error.message}`;
            // para salir live poner este errror
            // response.message = 'We are having some server problems, please retry in a few seconds...';
        } else {
            response.message = error.error.error_code;
        }

        // if (error.error) {
        //     response.message = error.error.message;

        //     if (error.error.httpCode === 401) {
        //         this.router.navigate(['/login']);
        //     }

        //     if (error.error.errors) {

        //         const arrayErrors = Object.keys(error.error.errors).map(i => error.error.errors[i]);
        //         for (const err of arrayErrors) {
        //             response.result.push(err);
        //         }
        //     }
        // }

        // if (response.message === '') {
        //     // todo make general error message multilanguage
        //     response.message = 'We are having some server problems, please retry in a few seconds...';
        // }
        return throwError(response);
    }
}
