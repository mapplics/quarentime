import { Injectable } from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../../../models/general-response.model';
import {catchError, map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {ContactModel} from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService extends BaseService {

  constructor(public router: Router,
              public http: HttpClient) {
    super(router);
  }

  sendInvite(contactList: ContactModel[]): Observable<{} | GeneralResponse> {
    const url = `${this._API}User/Contacts`;
    return this.http.post<GeneralResponse>(url, {contacts: contactList})
        .pipe(
            map((res: GeneralResponse) => {
              return res;
            }),
            catchError(err => {
              return this.handleError(err);
            })
        );
  }

// {
//   "contacts": [
//     {
//       "name":"Edmar 223",
//       "phone_number": "+64225056778"
//     },
//     {
//       "name":"Pitu",
//       "phone_number": "123456"
//     }
//   ]
// }
}
