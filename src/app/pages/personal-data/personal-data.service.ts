import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {CountryModel, PersonalDataModel} from './models/personal-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map, retry} from "rxjs/internal/operators";
import { GeneralResponse } from 'src/app/models/general-response.model';
import { AuthService } from 'src/app/providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService extends BaseService {

  constructor(public router: Router,
              public authService: AuthService,
              public http: HttpClient) {
    super(router);
    this._countries = [
      new CountryModel('ar', 'Argentina', 'argentina.svg', '+54'),
    ];
  }

  private _personalData: PersonalDataModel;
  get personalData(): PersonalDataModel {
    return this._personalData;
  }

  set personalData(data) {
    this._personalData = data;
  }

  private _countries: CountryModel[];
  get countries(): CountryModel[] {
    return this._countries;
  }

  // send personal information
  sendPersonalInformation(): Observable<{} | GeneralResponse> {

    
    const url = `${this._API}User/PersonalInformation`;
    // todo ver!!!
    debugger;
    return this.http.post<GeneralResponse>(url, {
        email: this.authService.getEmail(),
        name: this._personalData.name,
        surname: this._personalData.surename,
        age: this._personalData.age,
        phoneNumber: this._personalData.phone
    })
        .pipe(
            map((res: GeneralResponse) => {
              debugger;
                return res;
            })
            ,
            catchError(err => {
                return this.handleError(err);
            })
        );
}

}
