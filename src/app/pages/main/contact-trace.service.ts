import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ContactModel} from './invite/models/contact.model';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../../models/general-response.model';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactTraceService extends BaseService {


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

  getContacts(): Observable<{} | GeneralResponse> {
    const url = `${this._API}User/Contacts`;
    return this.http.get<GeneralResponse>(url)
        .pipe(
            map((res: GeneralResponse) => {
              return res;
            }),
            catchError(err => {
              return this.handleError(err);
            })
        );
  }

  acceptInvite(inviteId: string): Observable<{} | GeneralResponse> {
    const url = `${this._API}User/FriendRequests/Accept`;
    return this.http.post<GeneralResponse>(url, { invite_id: inviteId })
        .pipe(
            map((res: GeneralResponse) => {
              return res;
            }),
            catchError(err => {
              return this.handleError(err);
            })
        );
  }

  getPendingRequest(): Observable<{} | GeneralResponse> {
    const url = `${this._API}User/FriendRequests/Pending`;
    return this.http.get<GeneralResponse>(url)
        .pipe(
            map((res: GeneralResponse) => {
              return res;
            }),
            catchError(err => {
              return this.handleError(err);
            })
        );
  }
}
