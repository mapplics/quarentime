import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {CountryModel, PersonalDataModel} from './models/personal-data.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService extends BaseService {

  constructor(public router: Router) {
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

}
