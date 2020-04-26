import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {throwError} from 'rxjs';
import { GeneralResponse } from 'src/app/models/general-response.model';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';



@Injectable()
export class BaseService {

    public _API = environment.api;
    public _HEADERS = new HttpHeaders();

    constructor(public router: Router, public firebaseCrashlytics: FirebaseCrashlytics) {
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
        } else if (error.status === 400) {
            response.message = 'Invalid data';

            if (error.error.result) {

                response.result = Object.keys(error.error.result).map(i => error.error.result[i]);                
            }
        } else {
            response.message = 'We are having some server problems, please retry in a few seconds...';
        }

        const crashlytics = this.firebaseCrashlytics.initialise();
        crashlytics.logException('Error http service ' +  response.message);

        return throwError(response);
    }
}
