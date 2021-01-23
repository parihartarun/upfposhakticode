import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = sessionStorage.getItem("token");
    //let tokenType = sessionStorage.getItem('tokenType');
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization:  "Bearer " + currentUser
        }
      });
    }

    return next.handle(request);
  }
    
}