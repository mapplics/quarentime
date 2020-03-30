import { Injectable } from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralResponse} from '../../models/general-response.model';
import {catchError, map} from 'rxjs/internal/operators';
import {ContactPhoneModel} from './invite/models/contact-phone.model';
import {ContactModel} from './contact-trace/models/contact.model';
import { ContactTraceModel } from './contact-trace/models/contact-trace.model';

@Injectable({
    providedIn: 'root'
})
export class ContactTraceService extends BaseService {


    constructor(public router: Router,
                public http: HttpClient) {
        super(router);
    }

    sendInvite(contactList: ContactPhoneModel[]): Observable<{} | GeneralResponse> {
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
                    const data = ContactModel.createFromObjectCollection(res.result);
                    return new GeneralResponse(res.request_id, data);
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
    }

    getContactTrace(): Observable<{} | GeneralResponse> {
        const url = `${this._API}User/Contacts/Trace`;
        return this.http.get<GeneralResponse>(url)
            .pipe(
                map((res: GeneralResponse) => {
                    const data = ContactTraceModel.createOne(res.result, new ContactTraceModel());
                    return new GeneralResponse(res.request_id, data);
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

    rejectInvite(inviteId: string): Observable<{} | GeneralResponse> {
        const url = `${this._API}User/FriendRequests/Reject?invite_id=${inviteId}`;
        return this.http.delete<GeneralResponse>(url)
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
                    const data = ContactModel.createFromObjectCollection(res.result);
                    return new GeneralResponse(res.request_id, data);
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
    }
}
