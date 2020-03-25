import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/providers/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    debugger;
    // this.authService.getTokenRefresh().then((t) => { token = t;});
    
    if (this.authService.getTokenRefresh()) {
      const transformedReq = req.clone({
        headers: req.headers.append('Authorization', token)
      });
      return next.handle(transformedReq);
    }
    return next.handle(req);
  }
}
