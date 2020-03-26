import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/providers/auth.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/internal/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.authService.getToken();
  //   debugger;
  //   // this.authService.getTokenRefresh().then((t) => { token = t;});
    
  //   if (this.authService.getTokenRefresh()) {
  //     const transformedReq = req.clone({
  //       headers: req.headers.append('Authorization', token)
  //     });
  //     return next.handle(transformedReq);
  //   }
  //   return next.handle(req);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(
      catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // return this.handle401Error(request, next);
        return this.authService.refreshToken().then(
          (token: any) => {
            //todo ver porq no envia este request
            return next.handle(this.addToken(request, token));
          });
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }
}
